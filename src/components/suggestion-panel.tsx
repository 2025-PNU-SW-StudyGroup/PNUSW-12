"use client"

import { Button } from "@/components/ui/button"
import { X, MessageSquare, Lightbulb, Sparkles } from "lucide-react"
import { useState } from "react"

interface SuggestionPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function SuggestionPanel({ isOpen, onClose }: SuggestionPanelProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null)

  const suggestions = [
    "파이썬으로 웹 스크래핑 하는 방법을 알려주세요.",
    "머신러닝 모델을 학습시키는 기본 단계는 무엇인가요?",
    "React와 Next.js의 주요 차이점은 무엇인가요?",
    "데이터 시각화를 위한 최고의 라이브러리는 무엇인가요?",
    "클라우드 컴퓨팅의 장점은 무엇인가요?",
  ]

  if (!isOpen) return null

  return (
    <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg z-20 border-l border-gray-200 transition-all duration-300 ease-in-out">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-lg">추천 질문</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500 mb-4">다음 질문들 중에서 선택하거나 직접 질문을 입력해보세요.</p>

        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedSuggestion === suggestion
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"
              }`}
              onClick={() => setSelectedSuggestion(suggestion)}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  {index % 3 === 0 ? (
                    <MessageSquare className="h-4 w-4 text-indigo-500" />
                  ) : index % 3 === 1 ? (
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Sparkles className="h-4 w-4 text-emerald-500" />
                  )}
                </div>
                <p className="text-sm">{suggestion}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white"
          disabled={!selectedSuggestion}
          onClick={() => {
            // 실제 구현에서는 선택된 제안을 채팅 입력으로 전송
            onClose()
          }}
        >
          질문하기
        </Button>
      </div>
    </div>
  )
}
