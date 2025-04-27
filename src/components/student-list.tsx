"use client"

import { Avatar } from "@/components/ui/avatar"
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface StudentListProps {
  selectedStudent: string
  onSelectStudent: (student: string) => void
}

const students = [
  { id: 1, name: "김가영", status: "active" },
  { id: 2, name: "김민선", status: "active" },
  { id: 3, name: "박지훈", status: "active" },
  { id: 4, name: "이정민", status: "active" },
  { id: 5, name: "최준호", status: "inactive" },
  { id: 6, name: "정수아", status: "active" },
  { id: 7, name: "이민재", status: "active" },
  { id: 8, name: "한지원", status: "active" },
  { id: 9, name: "송하은", status: "inactive" },
  { id: 10, name: "강현우", status: "active" },
  { id: 11, name: "윤서연", status: "active" },
  { id: 12, name: "조민준", status: "active" },
  { id: 13, name: "임지아", status: "inactive" },
  { id: 14, name: "오태양", status: "active" },
  { id: 15, name: "신예은", status: "active" },
  { id: 16, name: "권도현", status: "active" },
]

export function StudentList({ selectedStudent, onSelectStudent }: StudentListProps) {
  return (
    <div className="w-64 bg-white shadow-sm flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold mb-4">제출 16/20명</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="학생 검색" className="pl-8 bg-gray-50 border-gray-200" />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {students.map((student) => (
          <Button
            key={student.id}
            variant="ghost"
            className={`w-full justify-start p-3 rounded-none relative ${
              selectedStudent === student.name ? "bg-[#f1f1f5]" : student.status === "inactive" ? "opacity-50" : ""
            }`}
            onClick={() => onSelectStudent(student.name)}
          >
            {selectedStudent === student.name && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
            )}
            <Avatar className="mr-3">
              <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${student.name.charAt(0)}`} />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{student.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
