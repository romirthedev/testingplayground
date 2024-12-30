'use client'

import { useEffect, useRef } from 'react'
import styles from './ExperienceBackground.module.css'

const ExperienceBackground = ({ jobs }: { jobs: { title: string; company: string; period: string }[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const points: { x: number; y: number }[] = []
    const jobCount = jobs.length
    const graphWidth = canvas.width * 0.8
    const graphHeight = canvas.height * 0.6
    const startX = (canvas.width - graphWidth) / 2
    const startY = (canvas.height + graphHeight) / 2

    for (let i = 0; i < jobCount; i++) {
      points.push({
        x: startX + (graphWidth / (jobCount - 1)) * i,
        y: startY - Math.random() * graphHeight
      })
    }

    let currentPoint = 0
    let progress = 0

    const drawGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.8)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)

      for (let i = 1; i < currentPoint; i++) {
        ctx.lineTo(points[i].x, points[i].y)
      }

      if (currentPoint < points.length) {
        const prevPoint = points[currentPoint - 1] || points[0]
        const nextPoint = points[currentPoint]
        ctx.lineTo(
          prevPoint.x + (nextPoint.x - prevPoint.x) * progress,
          prevPoint.y + (nextPoint.y - prevPoint.y) * progress
        )
      }

      ctx.stroke()

      // Draw dots at each point
      ctx.fillStyle = 'rgba(138, 43, 226, 1)'
      for (let i = 0; i < currentPoint; i++) {
        ctx.beginPath()
        ctx.arc(points[i].x, points[i].y, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      if (currentPoint < points.length) {
        progress += 0.02
        if (progress >= 1) {
          currentPoint++
          progress = 0
        }
        requestAnimationFrame(drawGraph)
      }
    }

    drawGraph()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawGraph()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [jobs])

  return <canvas ref={canvasRef} className={styles.experienceBackground} />
}

export default ExperienceBackground

