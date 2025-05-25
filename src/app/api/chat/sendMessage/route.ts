import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID!;

export async function POST(req: NextRequest) {
  try {
    const { threadId, userInput, fileId } = await req.json();

    if (!threadId || (!userInput && !fileId)) {
      return NextResponse.json({ error: "threadId와 userInput 또는 fileId 필요" }, { status: 400 });
    }

    const messagePayload: any = {
      role: "user",
    };

    if (userInput) {
      messagePayload.content = userInput;
    } else {
      // 최소한 content는 있어야 함 (빈 문자열이라도)
      messagePayload.content = "[이미지 업로드]";
    }

    if (fileId && fileId.startsWith("file-")) {
      messagePayload.file_ids = [fileId];
    }

    console.log("messagePayload:", JSON.stringify(messagePayload, null, 2));

    const messageRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "OpenAI-Beta": "assistants=v2",
      },
      body: JSON.stringify(messagePayload),
    });

    const messageData = await messageRes.json();
    if (!messageRes.ok) {
      console.error("메시지 전송 실패:", messageData);
      return NextResponse.json({ error: messageData.error?.message || "메시지 추가 실패" }, { status: 500 });
    }

    // Run 실행
    const runRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "OpenAI-Beta": "assistants=v2",
      },
      body: JSON.stringify({ assistant_id: ASSISTANT_ID }),
    });

    const runData = await runRes.json();
    if (!runRes.ok) {
      return NextResponse.json({ error: runData.error?.message || "Run 실행 실패" }, { status: 500 });
    }

    let status = runData.status;
    let runId = runData.id;

    while (status !== "completed") {
      await new Promise((r) => setTimeout(r, 1000));
      const checkRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "OpenAI-Beta": "assistants=v2",
        },
      });
      const checkData = await checkRes.json();
      status = checkData.status;
    }

    const messagesRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "OpenAI-Beta": "assistants=v2",
      },
    });

    const messagesData = await messagesRes.json();
    const assistantMessage = messagesData.data.find((m: any) => m.role === "assistant");

    return NextResponse.json({
      assistantReply: assistantMessage?.content?.[0]?.text?.value || "[AI 응답 없음]",
    });
  } catch (error) {
    const err = error as Error;
    console.error("전송 중 서버 오류:", err);
    return NextResponse.json({ error: err.message || "서버 오류 발생" }, { status: 500 });
  }
}
