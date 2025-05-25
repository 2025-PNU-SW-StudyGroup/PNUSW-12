export async function createThread(): Promise<string> {
  const res = await fetch("./api/chat/createThread", {
    method: "POST",
  });
  const data = await res.json();
  console.log("Thread ID from API:", data.threadId);
  return data.threadId;
}

export async function sendMessage(
  threadId: string,
  userInput: string,
  fileId?: string
): Promise<string> {
  const body: any = {
    threadId,
    userInput,
  };

  if (fileId) {
    body.fileId = fileId;
  }

  const res = await fetch("/api/chat/sendMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data.assistantReply;
}

// Vision API: 이미지 -> 문제 텍스트
export async function extractProblemFromImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/chat/analyzeImage", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "문제 추출 실패");
  return data.result;
}

// Assistant API: 질문 + 문제 텍스트 -> 응답
export async function sendMessageToAssistant(
  threadId: string,
  fullText: string
): Promise<string> {
  const res = await fetch("/api/chat/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ threadId, userInput: fullText }),
  });

  const data = await res.json();
  return data.assistantReply;
}
