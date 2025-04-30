"use client";

import { useState, useCallback, useEffect, use } from "react";
import { createThread, extractProblemFromImage, sendMessageToAssistant } from "@/lib/api";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore";

interface Message {
  id: number;
  role: string;
  content: string;
  timestamp: string;
}

// Firestore 초기화
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function useChat() {
  const [currentChat, setCurrentChat] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // 데이터 조회
  const getData = async (classId: string, studentId: string, threadId: string) => {
    const docRef = doc(db, "classes", classId, "students", studentId, "thread", threadId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      console.log(data);

      return data;
    } else {
      console.log("No such document.");

      return null;
    }
  }

  // 데이터 저장
  const setData = async (classId: string, studentId: string, threadId: string, chatLog: Message[]) => {
    const docRef = doc(db, "classes", classId, "students", studentId, "thread", threadId);

    await setDoc(docRef, {
      chatLog: chatLog,
      date: new Date,
      threadId: threadId,
    });

    console.log("Updated.");
  }

  // 채팅 가져오기
  const getChat = async (classId: string, studentId: string, threadId: string) => {
    const data = await getData("class01", "student01", threadId);
    const chatLog = data?.chatLog || [];
    setMessages(chatLog);

    return chatLog;
  }

  // 채팅 저장
  const setChat = async (classId: string, studentId: string, threadId: string, updatedChat: Message[]) => {
    setData(classId, studentId, threadId, updatedChat);

    return;
  }

  // 새 채팅 생성
  const createNewChat = async (classId: string, studentId: string) => {
    const threadId = await createThread();

    setData(classId, studentId, threadId, []);
    setCurrentChat(threadId);

    return;
  }

  const handleSendMessage = async (threadId: string) => {
    if (!input.trim() && !uploadedFile) return;

    const maxId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 0;

    const userMessage: Message = {
      id: maxId,
      role: "user",
      content: input.trim() || "[이미지 업로드됨]",
      timestamp: new Date().toISOString(),
    };

    let updated = [...messages, userMessage];
    setMessages(updated);
    setInput("");

    try {
      let finalInput = input.trim();

      if (uploadedFile) {
        const problemText = await extractProblemFromImage(uploadedFile); // Vision 분석
        finalInput += `\n\n문제:\n${problemText}`;
      }

      const assistantReply = await sendMessageToAssistant(threadId, finalInput); // 어시스턴트 호출

      const aiMessage: Message = {
        id: maxId + 1,
        role: "assistant",
        content: assistantReply || "[응답 없음]",
        timestamp: new Date().toISOString(),
      };

      updated = [...updated, aiMessage];
      setMessages(updated);
      await setChat("class01", "student01", threadId, updated);
    } catch (err) {
      console.error("에러 발생:", err);
    }

    setUploadedFile(null);
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file); // SendMessage에서 분석
  };

  return {
    currentChat,
    setCurrentChat,
    messages,
    setMessages,
    input,
    setInput,
    getChat,
    setChat,
    createNewChat,
    handleSendMessage,
    handleImageUpload,
  };
}