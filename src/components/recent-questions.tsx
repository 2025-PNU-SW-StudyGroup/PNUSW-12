interface RecentQuestionsProps {
  studentName: string
}

export function RecentQuestions({ studentName }: RecentQuestionsProps) {
  // 학생별 질문 데이터 (실제 구현에서는 API에서 가져옵니다)
  const questionsMap: Record<string, { text: string; date: string; subject: string }[]> = {
    김가영: [
      {
        text: "삼각형의 내심과 외심의 차이점이 무엇인가요?",
        date: "2023-11-15",
        subject: "기하",
      },
      {
        text: "이차함수의 최대값과 최소값을 구하는 방법을 알려주세요.",
        date: "2023-11-10",
        subject: "대수",
      },
      {
        text: "통계에서 표준편차와 분산의 관계가 궁금합니다.",
        date: "2023-11-05",
        subject: "통계",
      },
    ],
    김민선: [
      {
        text: "삼각비의 활용 문제를 어떻게 풀어야 할까요?",
        date: "2023-11-14",
        subject: "삼각법",
      },
      {
        text: "확률의 덧셈정리와 곱셈정리의 차이점이 무엇인가요?",
        date: "2023-11-08",
        subject: "확률",
      },
    ],
    박지훈: [
      {
        text: "원의 방정식에서 중심과 반지름을 어떻게 구하나요?",
        date: "2023-11-12",
        subject: "기하",
      },
      {
        text: "인수분해 공식을 언제 사용해야 하는지 헷갈립니다.",
        date: "2023-11-07",
        subject: "대수",
      },
    ],
    이정민: [
      {
        text: "로그함수의 그래프를 그리는 방법을 알려주세요.",
        date: "2023-11-13",
        subject: "함수",
      },
      {
        text: "삼각함수의 주기성에 대해 더 자세히 설명해주세요.",
        date: "2023-11-06",
        subject: "삼각법",
      },
    ],
  }

  // 현재 선택된 학생의 질문 가져오기
  const questions = questionsMap[studentName] || []

  return (
    <div className="space-y-3">
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <div key={index} className="border-l-2 border-indigo-500 pl-3 py-1">
            <p className="text-sm">{question.text}</p>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">{question.date}</span>
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">{question.subject}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">최근 질문이 없습니다.</p>
      )}
    </div>
  )
}
