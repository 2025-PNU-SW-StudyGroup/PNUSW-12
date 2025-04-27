import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, GripVertical, Edit, Copy, Download } from "lucide-react"

export function AIAssessmentCard() {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4">
        <div className="flex items-center">
          <GripVertical className="h-4 w-4 text-gray-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardTitle className="text-sm font-medium">세부능력특기사항 초안</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-4">
        <div className="border rounded-md p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="font-medium text-sm">김민준 - 생활기록부 초안</span>
              <span className="text-xs text-gray-500 ml-2">자동 생성됨</span>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Edit className="h-3.5 w-3.5 text-[#18a8f1]" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Copy className="h-3.5 w-3.5 text-[#18a8f1]" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Download className="h-3.5 w-3.5 text-[#18a8f1]" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            학생은 수학적 개념을 빠르게 이해하고 응용하는 능력이 뛰어납니다. 특히 대수학 영역에서 이차방정식의 근의
            공식을 활용한 문제 해결에 탁월한 능력을 보이며, 판별식의 의미와 활용에 대한 깊은 이해를 갖추고 있습니다.
            <br />
            <br />
            삼각함수의 주기성과 그래프 해석에 관심이 많으며, 이를 실생활 문제에 적용하는 능력이 우수합니다. '피타고라스
            정리의 다양한 증명 방법'에 관한 보고서를 통해 기하학적 증명 능력과 논리적 사고력을 보여주었으며, '수학자
            이야기: 오일러의 삶과 업적'에 관한 독후감에서는 수학사에 대한 깊은 관심과 이해를 드러냈습니다.
            <br />
            <br />
            확률과 통계 영역에서는 조건부 확률 개념을 이해하고 이를 활용한 문제 해결에 어려움을 느끼고 있으나,
            적극적으로 질문하며 개념을 명확히 하려는 노력을 보입니다. '실생활에서의 함수 활용 사례' 보고서를 통해 수학적
            개념을 일상생활에 연결시키는 통합적 사고 능력을 보여주었습니다.
            <br />
            <br />
            미적분 영역에서는 미분 계수의 기하학적 의미에 대한 질문을 통해 개념적 이해를 깊게 하려는 모습을 보였으며,
            벡터의 내적과 외적에 대한 질문을 통해 공간 지각력과 벡터 연산에 대한 관심을 드러냈습니다. 전반적으로 수학적
            호기심이 많고 개념의 원리를 이해하려는 탐구적 자세가 돋보이는 학생입니다.
          </p>
        </div>
      </CardContent>
    </>
  )
}
