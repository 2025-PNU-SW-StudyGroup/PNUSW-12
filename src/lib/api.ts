export async function createThread(): Promise<string> {
    const res = await fetch("./api/chat/createThread", {
        method: "POST",
    });
    const data = await res.json();
    console.log("Thread ID from API:", data.threadId);
    return data.threadId;
}

export async function sendMessage(threadId: string, userInput: string, fileId?: string): Promise<string> {
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

export async function uploadFileToOpenAI(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/chat/uploadFile', {  // 우리 서버에 요청
        method: 'POST',
        body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || '파일 업로드 실패');
    }

    return data.fileId; // 서버가 fileId 반환해줌
}

export async function uploadImageAndAnalyze(file: File, input: string): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("input", input); // 학생 질문도 같이 보냄

    const res = await fetch("/api/chat/analyzeImage", {
        method: "POST",
        body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "이미지 분석 실패");
    }

    return data.result;
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
  export async function sendMessageToAssistant(threadId: string, fullText: string): Promise<string> {
    const res = await fetch("/api/chat/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId, userInput: fullText }),
    });
  
    const data = await res.json();
    return data.assistantReply;
  }
  