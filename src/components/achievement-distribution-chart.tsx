"use client"

import { useEffect, useRef } from "react"

export function AchievementDistributionChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // 실제 구현에서는 Chart.js 등의 라이브러리를 사용하여 막대 차트를 구현합니다
    // 여기서는 간단한 시각적 표현만 제공합니다
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 캔버스 크기 설정
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // 데이터
    const data = [48, 65, 72, 95, 83]
    const labels = ["1단원", "2단원", "3단원", "4단원", "5단원"]
    const maxValue = 100
    const padding = 30
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const barWidth = chartWidth / data.length / 2
    const barSpacing = chartWidth / data.length

    // 배경 그리드 그리기
    ctx.strokeStyle = "#e5e7eb"
    ctx.beginPath()
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight * i) / 5
      ctx.moveTo(padding, y)
      ctx.lineTo(padding + chartWidth, y)
    }
    ctx.stroke()

    // Y축 레이블 그리기
    ctx.fillStyle = "#9ca3af"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    for (let i = 0; i <= 5; i++) {
      const value = maxValue - (maxValue * i) / 5
      const y = padding + (chartHeight * i) / 5
      ctx.fillText(`${value}%`, padding - 5, y)
    }

    // 막대 그리기
    for (let i = 0; i < data.length; i++) {
      const x = padding + i * barSpacing + barWidth / 2
      const barHeight = (chartHeight * data[i]) / maxValue
      const y = padding + chartHeight - barHeight

      // 막대 그리기
      ctx.fillStyle = i === 3 ? "rgba(59, 130, 246, 0.8)" : "rgba(219, 234, 254, 0.8)"
      ctx.fillRect(x, y, barWidth, barHeight)

      // 데이터 포인트 그리기
      if (i > 0) {
        ctx.strokeStyle = "rgba(37, 99, 235, 0.8)"
        ctx.setLineDash([2, 2])
        ctx.beginPath()
        const prevX = padding + (i - 1) * barSpacing + barWidth / 2 + barWidth / 2
        const prevY = padding + chartHeight - (chartHeight * data[i - 1]) / maxValue
        const currX = x
        const currY = y
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(currX, currY)
        ctx.stroke()
        ctx.setLineDash([])
      }

      // X축 레이블 그리기
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText(labels[i], x + barWidth / 2, padding + chartHeight + 5)
    }
  }, [])

  return (
    <div className="relative h-64">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
