import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, GripVertical } from "lucide-react"

export function QuestionTrendsCard() {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4">
        <div className="flex items-center">
          <GripVertical className="h-4 w-4 text-gray-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardTitle className="text-sm font-medium">질문 성향 분석</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4 h-[350px] flex items-center">
        <div className="w-full h-full relative">
          {/* 도넛 차트 */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="2" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* 도넛 차트 조각들 */}
            <circle cx="50" cy="50" r="40" fill="white" filter="url(#shadow)" />

            {/* 대수학 - 30% */}
            <path d="M50,50 L50,10 A40,40 0 0,1 84.6,35 Z" fill="#18a8f1" />

            {/* 기하학 - 25% */}
            <path d="M50,50 L84.6,35 A40,40 0 0,1 77.3,77.3 Z" fill="#58CCFF" />

            {/* 미적분 - 20% */}
            <path d="M50,50 L77.3,77.3 A40,40 0 0,1 35,84.6 Z" fill="#90e0ef" />

            {/* 확률과 통계 - 15% */}
            <path d="M50,50 L35,84.6 A40,40 0 0,1 10,50 Z" fill="#caf0f8" />

            {/* 삼각함수 - 10% */}
            <path d="M50,50 L10,50 A40,40 0 0,1 50,10 Z" fill="#0077b6" />

            {/* 중앙 흰색 원 */}
            <circle cx="50" cy="50" r="25" fill="white" />
          </svg>

          {/* 범례 */}
          <div className="absolute bottom-0 left-0 w-full flex flex-col items-center text-xs">
            <div className="grid grid-cols-3 gap-2 w-full">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#18a8f1] mr-1 rounded-sm"></div>
                <span className="text-[10px]">대수학 (30%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#58CCFF] mr-1 rounded-sm"></div>
                <span className="text-[10px]">기하학 (25%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#90e0ef] mr-1 rounded-sm"></div>
                <span className="text-[10px]">미적분 (20%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#caf0f8] mr-1 rounded-sm"></div>
                <span className="text-[10px]">확률/통계 (15%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#0077b6] mr-1 rounded-sm"></div>
                <span className="text-[10px]">삼각함수 (10%)</span>
              </div>
            </div>
          </div>

          {/* 중앙 텍스트 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-lg font-bold text-[#18a8f1]">대수학</div>
            <div className="text-xs text-gray-500">가장 많은 질문</div>
          </div>
        </div>
      </CardContent>
    </>
  )
}
