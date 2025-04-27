import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Calculator,
  PieChart,
  ActivityIcon as Function,
  Circle,
  Triangle,
  Square,
  Sigma,
  BarChart,
  Percent,
  Hash,
} from "lucide-react"

const conversations = [
  {
    id: 1,
    title: "이차방정식 근의 공식 유도 과정",
    icon: <Function className="h-4 w-4" />,
  },
  {
    id: 2,
    title: "삼각함수의 덧셈정리 증명",
    icon: <Triangle className="h-4 w-4" />,
  },
  {
    id: 3,
    title: "원의 방정식과 접선의 관계",
    icon: <Circle className="h-4 w-4" />,
  },
  {
    id: 4,
    title: "확률분포와 기댓값 계산 방법",
    icon: <PieChart className="h-4 w-4" />,
  },
  {
    id: 5,
    title: "미분계수의 기하학적 의미",
    icon: <Function className="h-4 w-4" />,
  },
  {
    id: 6,
    title: "적분의 응용: 넓이와 부피",
    icon: <Square className="h-4 w-4" />,
  },
  {
    id: 7,
    title: "수열의 극한과 무한급수",
    icon: <Sigma className="h-4 w-4" />,
  },
  {
    id: 8,
    title: "통계적 추정과 가설검정",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    id: 9,
    title: "로그함수의 성질과 그래프",
    icon: <Function className="h-4 w-4" />,
  },
  {
    id: 10,
    title: "복소수의 극형식과 오일러 공식",
    icon: <Calculator className="h-4 w-4" />,
  },
  {
    id: 11,
    title: "벡터의 내적과 외적 계산",
    icon: <Hash className="h-4 w-4" />,
  },
  {
    id: 12,
    title: "이항분포와 정규분포의 관계",
    icon: <Percent className="h-4 w-4" />,
  },
]

export function ConversationList() {
  return (
    <ScrollArea className="h-[calc(100vh-240px)]">
      <div className="pr-2">
        {conversations.map((conversation) => (
          <Button key={conversation.id} variant="ghost" className="w-full justify-start mb-1 text-gray-700 font-normal">
            <div className="mr-2">{conversation.icon}</div>
            <span className="truncate">{conversation.title}</span>
          </Button>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-4">최근 7일</div>
    </ScrollArea>
  )
}
