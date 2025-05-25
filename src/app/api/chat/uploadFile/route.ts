import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const incomingFormData = await req.formData();
    const file = incomingFormData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "유효한 파일이 없습니다." }, { status: 400 });
    }

    // File로 강제 변환
    const typedFile = new File([file as Blob], "uploaded.png", { type: (file as Blob).type });

    const uploadForm = new FormData();
    uploadForm.append("file", typedFile);
    uploadForm.append("purpose", "vision"); // 이미지 인식용

    // 서버 fetch
    const res = await fetch("https://api.openai.com/v1/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        // Content-Type을 명시적으로 안 써야 FormData가 boundary를 자동 생성
      },
      body: uploadForm,
    });

    const data = await res.json();
    console.log("OpenAI 파일 업로드 응답:", data);

    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message || "파일 업로드 실패" }, { status: 500 });
    }

    return NextResponse.json({ fileId: data.id });
  } catch (error) {
    const err = error as Error;
    console.error("파일 업로드 서버 오류:", err);
    return NextResponse.json({ error: err.message || "서버 오류" }, { status: 500 });
  }
}
