"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload, BookOpen, FileText } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("report")
  const [content, setContent] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 실제 구현에서는 API 호출을 통해 데이터를 서버에 전송합니다
    setTimeout(() => {
      setIsSubmitting(false)
      alert("제출이 완료되었습니다!")
      setTitle("")
      setContent("")
      setFile(null)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#f1f1f5] p-4">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">보고서 및 독후감 등록</h1>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* 제목 입력 */}
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="border-gray-200 focus:border-indigo-500"
                />
              </div>

              {/* 카테고리 선택 */}
              <div className="space-y-2">
                <Label htmlFor="category">카테고리</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="border-gray-200 focus:border-indigo-500">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="report">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>보고서</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="book_review">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>독후감</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 내용 입력 */}
              <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  placeholder="내용을 입력하세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="min-h-[200px] border-gray-200 focus:border-indigo-500"
                />
              </div>

              {/* 파일 업로드 */}
              <div className="space-y-2">
                <Label htmlFor="file">첨부 파일 (선택사항)</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-1">파일을 끌어다 놓거나 클릭하여 업로드하세요</p>
                      <p className="text-xs text-gray-400">최대 10MB, PDF, DOCX, JPG 형식 지원</p>
                      {file && (
                        <div className="mt-3 text-sm text-indigo-600">
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* 제출 버튼 */}
              <Button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "제출 중..." : "제출하기"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
