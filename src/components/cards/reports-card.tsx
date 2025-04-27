import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, GripVertical, FileText, BookOpen, Eye, Download } from "lucide-react"

// 김민준 학생의 보고서 데이터
const studentReports = [
  {
    id: 1,
    type: "report",
    title: "피타고라스 정리의 다양한 증명 방법",
    date: "2023-05-15",
    topic: "기하학",
    pages: 5,
  },
  {
    id: 2,
    type: "report",
    title: "실생활에서의 함수 활용 사례",
    date: "2023-04-20",
    topic: "함수",
    pages: 7,
  },
  {
    id: 3,
    type: "book",
    title: "수학자 이야기: 오일러의 삶과 업적",
    date: "2023-03-10",
    topic: "수학사",
    pages: 12,
  },
  {
    id: 4,
    type: "report",
    title: "확률과 통계를 활용한 데이터 분석",
    date: "2023-02-25",
    topic: "확률과 통계",
    pages: 8,
  },
  {
    id: 5,
    type: "book",
    title: "수학의 아름다움: 황금비율과 피보나치 수열",
    date: "2023-01-15",
    topic: "수열",
    pages: 10,
  },
]

export function ReportsCard() {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4">
        <div className="flex items-center">
          <GripVertical className="h-4 w-4 text-gray-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardTitle className="text-sm font-medium">보고서 및 독후감</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4 h-[250px] overflow-auto">
        <div className="space-y-3">
          {studentReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center">
                <div className="mr-3 p-2 bg-gray-100 rounded-md">
                  {report.type === "report" ? (
                    <FileText className="h-4 w-4 text-[#18a8f1]" />
                  ) : (
                    <BookOpen className="h-4 w-4 text-[#58CCFF]" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-medium">{report.title}</div>
                  <div className="flex items-center mt-1">
                    <span className="text-[10px] text-[#18a8f1] mr-2">{report.topic}</span>
                    <span className="text-[10px] text-gray-500 mr-2">{report.date}</span>
                    <span className="text-[10px] text-gray-500">{report.pages}페이지</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Eye className="h-3.5 w-3.5 text-[#18a8f1]" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Download className="h-3.5 w-3.5 text-[#18a8f1]" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  )
}
