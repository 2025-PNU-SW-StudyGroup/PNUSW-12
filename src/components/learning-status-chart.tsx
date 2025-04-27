"use client"

import { useEffect, useRef } from "react"

export function LearningStatusChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // 실제 구현에서는 Chart.js 등의 라이브러리를 사용하여 도넛 차트를 구현합니다
    // 여기서는 간단한 시각적 표현만 제공합니다
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 캔버스 크기 설정
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // 중심점
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) * 0.8

    // 데이터
    const data = [
      { label: "성취 완료", value: 58, color: "#3b82f6" },
      { label: "학습 진행 중", value: 17, color: "#10b981" },
      { label: "부족한 부분 발견", value: 13, color: "#f59e0b" },
      { label: "미참여", value: 12, color: "#e5e7eb" },
    ]

    // 도넛 차트 그리기
    let startAngle = -0.5 * Math.PI
    const total = data.reduce((sum, item) => sum + item.value, 0)

    data.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.arc(centerX, centerY, radius * 0.6, startAngle + sliceAngle, startAngle, true)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      startAngle += sliceAngle
    })
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
      <div className="mt-4 text-sm space-y-1">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
          <span>성취 완료: 14명(58%)</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
          <span>학습 진행 중: 4명(17%)</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
          <span>부족한 부분 발견: 3명(13%)</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-gray-200 rounded-full mr-2"></span>
          <span>미참여: 3명(13%)</span>
        </div>
      </div>
    </div>
  )
}
