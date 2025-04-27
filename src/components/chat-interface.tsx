"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { ChatArea } from "./chat-area"
import { useMobile } from "@/hooks/use-mobile"

export default function ChatInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isMobile = useMobile()

  return (
    <div className="flex h-[calc(100vh-2rem)] overflow-hidden">
      {(!isMobile || sidebarOpen) && (
        <Sidebar onCloseSidebar={() => setSidebarOpen(false)} className={isMobile ? "absolute z-10 h-full" : ""} />
      )}
      <ChatArea onOpenSidebar={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} isMobile={isMobile} />
    </div>
  )
}
