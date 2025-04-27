interface StudentInsightsProps {
  studentName: string
}

export function StudentInsights({ studentName }: StudentInsightsProps) {
  // 학생별 인사이트 데이터 (실제 구현에서는 API에서 가져옵니다)
  const insightsMap: Record<
    string,
    {
      strengths: string[]
      weaknesses: string[]
      learningStyle: string
      recommendations: string[]
    }
  > = {
    김가영: {
      strengths: [
        "통계 영역에서 뛰어난 이해력과 분석 능력을 보여줍니다.",
        "문제 해결 과정을 논리적으로 설명하는 능력이 우수합니다.",
        "수학적 개념을 실생활에 적용하는 능력이 뛰어납니다.",
      ],
      weaknesses: [
        "삼각비 관련 문제에서 어려움을 겪고 있습니다.",
        "기하학적 증명 문제에 대한 접근 방식이 다소 부족합니다.",
      ],
      learningStyle: "시각적 학습자로, 그래프와 다이어그램을 통한 설명에 잘 반응합니다.",
      recommendations: [
        "삼각비 개념을 시각적 자료와 함께 복습하는 것을 권장합니다.",
        "기하학적 증명의 기본 원리를 단계별로 학습하도록 지도해 주세요.",
        "통계 영역의 심화 문제를 제공하여 학습 동기를 유지하세요.",
      ],
    },
    김민선: {
      strengths: ["대수적 문제 해결 능력이 우수합니다.", "수학적 개념을 빠르게 이해하고 적용합니다."],
      weaknesses: [
        "확률과 통계 영역에서 개념 이해가 부족합니다.",
        "문제 해결 과정을 체계적으로 정리하는 습관이 필요합니다.",
      ],
      learningStyle: "개념적 학습자로, 원리 이해를 통한 학습 방식을 선호합니다.",
      recommendations: [
        "확률과 통계의 기본 개념을 다양한 예시와 함께 설명해 주세요.",
        "문제 해결 과정을 단계별로 정리하는 습관을 기르도록 지도해 주세요.",
      ],
    },
    박지훈: {
      strengths: ["기하학적 직관력이 뛰어납니다.", "복잡한 문제를 단순화하여 접근하는 능력이 우수합니다."],
      weaknesses: ["대수적 공식 암기와 적용에 어려움을 겪고 있습니다.", "계산 과정에서 실수가 자주 발생합니다."],
      learningStyle: "실용적 학습자로, 실생활 문제와 연계된 학습에 흥미를 보입니다.",
      recommendations: [
        "대수적 공식의 의미와 유도 과정을 이해하도록 지도해 주세요.",
        "계산 과정을 꼼꼼히 확인하는 습관을 기르도록 격려해 주세요.",
      ],
    },
    이정민: {
      strengths: ["함수의 개념과 그래프 해석 능력이 우수합니다.", "수학적 추론 능력이 뛰어납니다."],
      weaknesses: ["기하학적 문제 해결에 어려움을 겪고 있습니다.", "복잡한 문제에 직면했을 때 인내심이 부족합니다."],
      learningStyle: "분석적 학습자로, 단계적이고 체계적인 접근 방식을 선호합니다.",
      recommendations: [
        "기하학적 개념을 단계별로 설명하고 충분한 연습 기회를 제공해 주세요.",
        "복잡한 문제를 작은 단위로 나누어 접근하는 방법을 지도해 주세요.",
      ],
    },
  }

  // 현재 선택된 학생의 인사이트 가져오기
  const insights = insightsMap[studentName] || {
    strengths: [],
    weaknesses: [],
    learningStyle: "",
    recommendations: [],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-md font-medium mb-3">강점</h3>
        <ul className="list-disc list-inside space-y-2 text-sm">
          {insights.strengths.map((strength, index) => (
            <li key={index} className="text-gray-700">
              {strength}
            </li>
          ))}
        </ul>

        <h3 className="text-md font-medium mt-6 mb-3">약점</h3>
        <ul className="list-disc list-inside space-y-2 text-sm">
          {insights.weaknesses.map((weakness, index) => (
            <li key={index} className="text-gray-700">
              {weakness}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-md font-medium mb-3">학습 스타일</h3>
        <p className="text-sm text-gray-700 mb-6">{insights.learningStyle}</p>

        <h3 className="text-md font-medium mb-3">교사 권장사항</h3>
        <ul className="list-disc list-inside space-y-2 text-sm">
          {insights.recommendations.map((recommendation, index) => (
            <li key={index} className="text-gray-700">
              {recommendation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
