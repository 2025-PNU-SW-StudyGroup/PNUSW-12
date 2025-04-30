import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "파일 없음" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
                    다음 이미지는 학생이 업로드한 수학 문제입니다.
                    이미지 속 수학 문제를 정확히 텍스트 형태로 추출해서 알려주세요.
                    해설하지 말고 문제 내용만 정확하게 추출하세요.
                    `,
            },
            {
              type: "image_url",
              image_url: { url: base64, detail: "high" },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    const problemText = res.choices[0].message.content;
    return NextResponse.json({ result: problemText });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
