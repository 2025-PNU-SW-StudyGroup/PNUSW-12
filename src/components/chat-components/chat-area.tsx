"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Send, Image as ImageIcon } from "lucide-react";
import { ChatMessage } from "./chat-message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createThread } from "@/libs/openai/api";

interface Message {
  id: number;
  role: string;
  content: string;
  timestamp: string;
}

interface ChatAreaProps {
  isMobile: boolean;
  sidebarOpen: boolean;
  onOpenSidebar: () => void;
  currentChat: string;
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  getChat: (classId: string, studentId: string, threadId: string) => Promise<Message[]>;
  setChat: (classId: string, studentId: string, threadId: string, updatedChat: Message[]) => void;
  createNewChat: (classId: string, studentId: string) => void;
  handleSendMessage: (threadId: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// ChatArea
export function ChatArea({
  isMobile,
  sidebarOpen,
  onOpenSidebar,
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
}: ChatAreaProps) {

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* 헤더 (모바일에서만 표시) */}
      {isMobile && !sidebarOpen && (
        <div className="p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSidebar}
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">채팅 세션</h2>
        </div>
      )}

      {/* 메시지 */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-6 py-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      {/* 입력 영역 */}
      <div className="p-4 flex justify-center relative">
        {/* 불투명 그라데이션 오버레이 */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f1f1f5] via-[#f1f1f5]/80 to-transparent pointer-events-none"></div>

        <div className="flex items-center max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-full shadow-md px-4 py-2 relative z-10">
          <Input
            placeholder=" 무엇이 궁금하신가요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (currentChat === "") {
                  currentChat = await createThread()
                  setCurrentChat(currentChat);
                  handleSendMessage(currentChat);
                }
                else {
                  handleSendMessage(currentChat);
                }
              }
            }}
            className="flex-1 border-none focus:outline-none bg-transparent px-0"
          />

            {/* 파일 업로드 버튼 */}
          <label className="cursor-pointer ml-2">
            <ImageIcon className="h-5 w-5" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <Button
            onClick={async () => {
              if (currentChat === "") {
                currentChat = await createThread()
                setCurrentChat(currentChat);
                handleSendMessage(currentChat);
              }
              else {
                handleSendMessage(currentChat);
              }
            }}
            size="icon"
            className="bg-[#18A8F1] hover:bg-[#1697d9] text-white rounded-full h-8 w-8 ml-2"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
