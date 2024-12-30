'use client'

import { useEffect, useRef } from 'react'
import styles from './ParticleWeb.module.css'

const ParticleWeb = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const particles: { x: number; y: number; directionX: number; directionY: number }[] = []
    const particleCount = 50 // Reduced from 100

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          directionX: (Math.random() - 0.5) * 1, // Reduced speed
          directionY: (Math.random() - 0.5) * 1  // Reduced speed
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(138, 43, 226, 0.5)'
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.1)'

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }

        p.x += p.directionX
        p.y += p.directionY

        if (p.x < 0 || p.x > canvas.width) p.directionX *= -1
        if (p.y < 0 || p.y > canvas.height) p.directionY *= -1
      }

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    resizeCanvas()
    createParticles()
    drawParticles()

    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.particleWeb} />
}

export default ParticleWeb

