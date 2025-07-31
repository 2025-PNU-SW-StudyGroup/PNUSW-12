'use client'

import { useState } from "react"
import StudentRecordForm from "@/components/StudentRecordForm"
import StudentSummary from "@/components/StudentSummary"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Brain } from "lucide-react"

interface StudentRecord {
  academic: string
  creative: string
  behavior: string
  reading: string
}

interface Summary {
  strengths: string[]
  keywords: string[]
  overview: string
  recommendations: string[]
}

export default function StudentAiAnalyzer() {
  const [record, setRecord] = useState<StudentRecord>({
    academic: "",
    creative: "",
    behavior: "",
    reading: "",
  })

  const [summary, setSummary] = useState<Summary | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const generateSummary = async () => {
    setIsAnalyzing(true)
    await new Promise((r) => setTimeout(r, 2000))
    const text = Object.values(record).join(" ")

    const keywords = extractKeywords(text)
    const strengths = extractStrengths(text)
    const overview = generateOverview(record)
    const recommendations = generateRecommendations(text)

    setSummary({ keywords, strengths, overview, recommendations })
    setIsAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        {/* 입력 */}
        <Card>
          <CardHeader>
            <CardTitle>생활기록부 입력</CardTitle>
            <CardDescription>학생의 학습 및 활동 내용을 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentRecordForm record={record} setRecord={setRecord} />
            <Button onClick={generateSummary} disabled={isAnalyzing} className="mt-6 w-full">
              {isAnalyzing ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-spin" />
                  분석 중...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  AI 분석 시작
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* 결과 */}
        <Card>
          <CardHeader>
            <CardTitle>AI 분석 결과</CardTitle>
            <CardDescription>학생의 핵심 역량과 특성을 요약한 결과입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentSummary summary={summary} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/* 간단한 분석 함수들 (원래 코드 그대로 복사) */
function extractKeywords(text: string): string[] {
  const keywords = ["리더십", "창의성", "협력", "소통", "분석", "탐구", "봉사", "책임감", "도전"]
  return keywords.filter(k => text.includes(k)).slice(0, 6)
}

function extractStrengths(text: string): string[] {
  const result = []
  if (text.includes("리더")) result.push("리더십과 조직 운영 능력")
  if (text.includes("창의")) result.push("창의적 사고와 문제 해결 능력")
  if (text.includes("협력")) result.push("협업과 소통 능력")
  if (text.includes("탐구")) result.push("탐구심과 분석적 사고")
  if (text.includes("봉사")) result.push("배려와 공동체 의식")
  return result.length ? result : ["성실한 태도", "긍정적인 자세"]
}

function generateOverview(record: StudentRecord): string {
  let o = "이 학생은 "
  if (record.academic.length > 50) o += "학업에 대한 열정을 보이며, "
  if (record.creative.length > 50) o += "창의적 체험을 통해 성장하고, "
  if (record.behavior.length > 50) o += "성숙한 인성과 태도를 갖추었으며, "
  if (record.reading.length > 30) o += "다양한 독서를 통해 지식을 확장하고 있습니다. "
  o += "전반적으로 우수한 학생으로 평가됩니다."
  return o
}

function generateRecommendations(text: string): string[] {
  const recs = [
    "지속적인 자기계발",
    "다양한 분야의 경험 확장",
    "글로벌 역량 강화를 위한 외국어 능력 개발",
  ]
  if (text.includes("리더")) recs.push("리더십을 살린 사회 기여 활동")
  if (text.includes("창의")) recs.push("창의력을 활용한 프로젝트 참여")
  return recs.slice(0, 4)
}
