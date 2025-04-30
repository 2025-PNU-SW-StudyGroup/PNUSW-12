"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { ChatArea } from "./chat-area"
import { useMobile } from "@/hooks/use-mobile"
import { useChat } from "@/hooks/use-chat"

export default function ChatInterface() {
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
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
  } = useChat();

  return (
    <div className="flex h-[calc(100vh-2rem)] overflow-hidden">
      {(!isMobile || sidebarOpen) && (
        <Sidebar onCloseSidebar={() => setSidebarOpen(false)} className={isMobile ? "absolute z-10 h-full" : ""} />
      )}
      <ChatArea
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        onOpenSidebar={() => setSidebarOpen(true)}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        messages={messages}
        setMessages={setMessages}
        input={input}
        setInput={setInput}
        getChat={getChat}
        setChat={setChat}
        createNewChat={createNewChat}
        handleSendMessage={handleSendMessage}
        handleImageUpload={handleImageUpload}
      />
    </div>
  )
}
