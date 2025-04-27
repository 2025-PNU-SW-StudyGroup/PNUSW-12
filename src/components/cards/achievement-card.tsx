import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, GripVertical } from "lucide-react"

// 김민준 학생의 단원별 성취도 데이터
const studentAchievements = [
  {
    id: "unit1",
    name: "1단원: 수와 연산",
    level: "상",
    percentage: 95,
    standard: "교육과정 성취기준 [수학 6-1-1]",
  },
  {
    id: "unit2",
    name: "2단원: 도형",
    level: "상",
    percentage: 92,
    standard: "교육과정 성취기준 [수학 6-1-2]",
  },
  {
    id: "unit3",
    name: "3단원: 규칙성과 함수",
    level: "중상",
    percentage: 85,
    standard: "교육과정 성취기준 [수학 6-1-3]",
  },
  {
    id: "unit4",
    name: "4단원: 확률과 통계",
    level: "상",
    percentage: 94,
    standard: "교육과정 성취기준 [수학 6-1-4]",
  },
  {
    id: "unit5",
    name: "5단원: 문제 해결",
    level: "상",
    percentage: 97,
    standard: "교육과정 성취기준 [수학 6-1-5]",
  },
]

// 성취도 등급에 따른 색상
const levelColors = {
  상: "bg-[#18a8f1]",
  중상: "bg-[#58CCFF]",
  중: "bg-[#90e0ef]",
  중하: "bg-yellow-400",
  하: "bg-red-400",
}

export function AchievementCard() {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4">
        <div className="flex items-center">
          <GripVertical className="h-4 w-4 text-gray-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardTitle className="text-sm font-medium">단원별 성취도</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4 h-[250px] overflow-auto">
        <div className="space-y-4">
          {studentAchievements.map((unit) => (
            <div key={unit.id} className="border rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-medium">{unit.name}</h3>
                <div
                  className={`px-2 py-1 rounded-full ${
                    levelColors[unit.level as keyof typeof levelColors]
                  } text-white font-medium text-xs`}
                >
                  {unit.level}
                </div>
              </div>
              <div className="text-[10px] text-gray-500 mb-2">{unit.standard}</div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200 mt-1">
                  <div
                    style={{ width: `${unit.percentage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#18a8f1]"
                  ></div>
                </div>
                <div className="flex justify-end">
                  <span className="text-xs font-semibold inline-block text-[#18a8f1]">{unit.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  )
}
