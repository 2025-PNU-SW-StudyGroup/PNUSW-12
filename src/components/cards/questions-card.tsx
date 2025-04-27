import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, GripVertical, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// 김민준 학생의 질문 데이터
const studentQuestions = [
  {
    id: 1,
    question: "이차방정식의 근의 공식을 사용할 때, 판별식이 음수인 경우 어떻게 해석해야 하나요?",
    time: "2일 전",
    answered: true,
    topic: "이차방정식",
  },
  {
    id: 2,
    question: "삼각함수의 주기성에 대해 더 자세히 설명해주실 수 있나요?",
    time: "3일 전",
    answered: true,
    topic: "삼각함수",
  },
  {
    id: 3,
    question: "확률 문제에서 조건부 확률을 계산하는 방법이 헷갈립니다.",
    time: "1주일 전",
    answered: true,
    topic: "확률",
  },
  {
    id: 4,
    question: "미분 계수의 기하학적 의미는 무엇인가요?",
    time: "2주일 전",
    answered: false,
    topic: "미분",
  },
  {
    id: 5,
    question: "벡터의 내적과 외적의 차이점과 각각의 활용 사례를 알고 싶습니다.",
    time: "3주일 전",
    answered: true,
    topic: "벡터",
  },
]

export function QuestionsCard() {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4">
        <div className="flex items-center">
          <GripVertical className="h-4 w-4 text-gray-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardTitle className="text-sm font-medium">최근 질문</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4 h-[250px] overflow-auto">
        <div className="space-y-3">
          {studentQuestions.map((question) => (
            <div
              key={question.id}
              className={cn(
                "p-3 border rounded-md",
                question.answered ? "bg-gray-50" : "bg-white border-[#18a8f1] border-opacity-50",
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-medium text-[#18a8f1]">{question.topic}</span>
                <span className="text-[10px] text-gray-500">{question.time}</span>
              </div>
              <p className="text-xs text-gray-700">{question.question}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] text-gray-500">{question.answered ? "답변 완료" : "답변 대기 중"}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                  <MessageCircle className="h-3.5 w-3.5 text-[#18a8f1]" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  )
}
