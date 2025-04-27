"use client"

import { useEffect, useRef } from "react"

export function AchievementRadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // 실제 구현에서는 Chart.js 등의 라이브러리를 사용하여 레이더 차트를 구현합니다
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

    // 축 그리기
    const axes = 6
    const angleStep = (Math.PI * 2) / axes
    const axisLabels = ["제금근과 실수", "통계", "원의 성질", "삼각비", "이차함수", "인수분해와\n이차방정식"]

    // 배경 그리드 그리기
    ctx.strokeStyle = "#e5e7eb"
    ctx.fillStyle = "rgba(243, 244, 246, 0.5)"

    for (let level = 1; level <= 4; level++) {
      const levelRadius = (radius * level) / 4
      ctx.beginPath()
      for (let i = 0; i < axes; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = centerX + levelRadius * Math.cos(angle)
        const y = centerY + levelRadius * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.stroke()
    }

    // 축 그리기
    ctx.strokeStyle = "#d1d5db"
    for (let i = 0; i < axes; i++) {
      const angle = i * angleStep - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()

      // 라벨 그리기
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const labelX = centerX + (radius + 15) * Math.cos(angle)
      const labelY = centerY + (radius + 15) * Math.sin(angle)

      // 줄바꿈 처리
      const lines = axisLabels[i].split("\n")
      lines.forEach((line, index) => {
        const offset = (index - (lines.length - 1) / 2) * 12
        ctx.fillText(line, labelX, labelY + offset)
      })
    }

    // 데이터 그리기 (학생 데이터)
    const studentData = [0.8, 0.9, 0.7, 0.5, 0.75, 0.85]
    ctx.fillStyle = "rgba(79, 70, 229, 0.2)"
    ctx.strokeStyle = "rgba(79, 70, 229, 0.8)"
    ctx.lineWidth = 2

    ctx.beginPath()
    for (let i = 0; i < axes; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = studentData[i]
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // 평균 데이터 그리기
    const averageData = [0.7, 0.65, 0.8, 0.6, 0.7, 0.75]
    ctx.strokeStyle = "rgba(16, 185, 129, 0.8)"
    ctx.setLineDash([5, 3])
    ctx.lineWidth = 2

    ctx.beginPath()
    for (let i = 0; i < axes; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = averageData[i]
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.stroke()
    ctx.setLineDash([])
  }, [])

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full h-64"></canvas>
      <div className="bg-blue-50 p-3 rounded-lg mt-2 text-sm">
        <p className="text-blue-800">
          <strong>통계</strong>에서 가장 높은 성취수준을 보이고 있어요! <strong>삼각비</strong>를 조금 더 높일 수 있도록
          지도해 주세요.
        </p>
      </div>
    </div>
  )
}
