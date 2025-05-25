import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

export async function POST() {
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
  } catch (error) {
    const err = error as Error;
    console.error("Thread 생성 오류:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
