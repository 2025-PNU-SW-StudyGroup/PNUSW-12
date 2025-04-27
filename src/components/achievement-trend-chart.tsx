"use client"

import { useEffect, useRef } from "react"

export function AchievementTrendChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // 실제 구현에서는 Chart.js 등의 라이브러리를 사용하여 선 차트를 구현합니다
    // 여기서는 간단한 시각적 표현만 제공합니다
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 캔버스 크기 설정
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // 데이터
    const data = [50, 55, 58, 56, 60, 72, 75, 74, 78, 85]
    const maxValue = 100
    const padding = 20
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2

    // 배경 그리기
    ctx.fillStyle = "rgba(219, 234, 254, 0.3)"
    ctx.fillRect(padding, padding, chartWidth, chartHeight)

    // 그리드 라인 그리기
    ctx.strokeStyle = "#e5e7eb"
    ctx.beginPath()
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight * i) / 5
      ctx.moveTo(padding, y)
      ctx.lineTo(padding + chartWidth, y)
    }
    ctx.stroke()

    // 데이터 포인트 그리기
    const pointWidth = chartWidth / (data.length - 1)

    // 영역 채우기
    ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
    ctx.beginPath()
    ctx.moveTo(padding, padding + chartHeight)
    for (let i = 0; i < data.length; i++) {
      const x = padding + i * pointWidth
      const y = padding + chartHeight - (chartHeight * data[i]) / maxValue
      ctx.lineTo(x, y)
    }
    ctx.lineTo(padding + chartWidth, padding + chartHeight)
    ctx.closePath()
    ctx.fill()

    // 선 그리기
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let i = 0; i < data.length; i++) {
      const x = padding + i * pointWidth
      const y = padding + chartHeight - (chartHeight * data[i]) / maxValue
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()
  }, [])

  return (
    <div className="flex flex-col ml-4">
      <h3 className="text-sm font-medium mb-1">성취완료율 변화</h3>
      <p className="text-xs text-gray-500 mb-2">최근 30일</p>
      <div className="relative w-40 h-32">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  )
}
