// StudentRecordForm.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { BookOpen, Sparkles, User, Activity } from 'lucide-react'
import { StudentRecord } from './StudentAiAnalyzer'

interface Props {
  record: StudentRecord
  setRecord: (r: StudentRecord) => void
}

export default function StudentRecordForm({ record, setRecord }: Props) {
  return (
    <Tabs defaultValue="academic" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="academic">교과</TabsTrigger>
        <TabsTrigger value="creative">창체</TabsTrigger>
        <TabsTrigger value="behavior">행동</TabsTrigger>
        <TabsTrigger value="reading">독서</TabsTrigger>
      </TabsList>

      {['academic', 'creative', 'behavior', 'reading'].map((field) => (
        <TabsContent key={field} value={field} className="space-y-4">
          <div>
            <Label htmlFor={field} className="flex items-center gap-2">
              {field === 'academic' && <BookOpen className="h-4 w-4" />}
              {field === 'creative' && <Sparkles className="h-4 w-4" />}
              {field === 'behavior' && <User className="h-4 w-4" />}
              {field === 'reading' && <Activity className="h-4 w-4" />}
              {labelMap[field]}
            </Label>
            <Textarea
              id={field}
              placeholder={placeholderMap[field]}
              value={record[field as keyof StudentRecord]}
              onChange={(e) => setRecord({ ...record, [field]: e.target.value })}
              className="mt-2 min-h-[120px]"
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

const labelMap: Record<string, string> = {
  academic: '교과학습발달상황',
  creative: '창의적 체험활동',
  behavior: '행동특성 및 종합의견',
  reading: '독서활동상황',
}

const placeholderMap: Record<string, string> = {
  academic: '교과 학습 성취도, 탐구 활동 등을 입력하세요...',
  creative: '동아리, 봉사, 진로활동 등을 입력하세요...',
  behavior: '성격, 행동 특성, 교우관계 등을 입력하세요...',
  reading: '도서명, 독서 소감 등을 입력하세요...',
}