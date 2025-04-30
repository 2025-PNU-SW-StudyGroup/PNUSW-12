import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const response = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "OpenAI-Beta": "assistants=v2",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || "Thread 생성 실패" }, { status: 500 });
    }

    return NextResponse.json({ threadId: data.id });
  } catch (error: any) {
    console.error("Thread 생성 오류:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
