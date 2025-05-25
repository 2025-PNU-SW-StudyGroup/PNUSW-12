"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, Settings, X, BookOpen } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConversationList } from "./conversation-list";
import Link from "next/link";

interface SidebarProps {
  onCloseSidebar?: () => void;
  className?: string;
}

export function Sidebar({ onCloseSidebar, className = "" }: SidebarProps) {
  return (
    <div
      className={`w-64 bg-white rounded-2xl shadow-sm p-4 mr-4 flex flex-col ${className}`}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">로그챗 A.I+</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCloseSidebar}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <Button className="w-full mt-4 bg-[#18A8F1] hover:bg-[#1697d9] text-white">
          <PlusIcon className="mr-2 h-4 w-4" /> 새 채팅
        </Button>

        <Link href="/reports">
          <Button className="w-full mt-2 bg-white text-[#18A8F1] border border-[#18A8F1] hover:bg-[#e6f4fc]">
            <BookOpen className="mr-2 h-4 w-4" /> 보고서/독후감 등록
          </Button>
        </Link>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="text-xs text-gray-500 mb-2">대화 목록</div>
        <ConversationList />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          <span>설정</span>
        </Button>
        <div className="flex items-center mt-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <div className="text-sm font-medium">홍길동</div>
          </div>
        </div>
      </div>
    </div>
  );
}
