
// StudentSummary.tsx
import { Summary } from './StudentAiAnalyzer'
import { Brain, Sparkles, User, FileText, Activity } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

interface Props {
  summary: Summary | null
}

export default function StudentSummary({ summary }: Props) {
  if (!summary) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>생활기록부를 입력하고 AI 분석을 시작해보세요.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-yellow-500" /> 핵심 키워드
        </h3>
        <div className="flex flex-wrap gap-2">
          {summary.keywords.map((keyword, idx) => (
            <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-800">
              {keyword}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <User className="h-4 w-4 text-green-500" /> 주요 강점
        </h3>
        <ul className="space-y-2">
          {summary.strengths.map((s, i) => (
            <li key={i} className="flex gap-2 items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <span className="text-sm text-gray-700">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4 text-purple-500" /> 종합 평가
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
          {summary.overview}
        </p>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Activity className="h-4 w-4 text-orange-500" /> 발전 방향 제안
        </h3>
        <ul className="space-y-2">
          {summary.recommendations.map((r, i) => (
            <li key={i} className="flex gap-2 items-start">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
              <span className="text-sm text-gray-700">{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
