"use client"
import { useEffect, useRef } from "react"

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const dots: Dot[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    let raf: number

    function animate() {
      ctx!.clearRect(0, 0, width, height)

      for (const dot of dots) {
        // Mouse repulsion
        const dx = dot.x - mouseRef.current.x
        const dy = dot.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120
          dot.vx += (dx / dist) * force * 0.08
          dot.vy += (dy / dist) * force * 0.08
        }

        // Speed limit
        const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy)
        if (speed > 1.2) {
          dot.vx *= 1.2 / speed
          dot.vy *= 1.2 / speed
        }

        // Friction
        dot.vx *= 0.99
        dot.vy *= 0.99

        dot.x += dot.vx
        dot.y += dot.vy

        // Wrap around edges
        if (dot.x < 0) dot.x = width
        if (dot.x > width) dot.x = 0
        if (dot.y < 0) dot.y = height
        if (dot.y > height) dot.y = 0

        // Draw dot
        ctx!.beginPath()
        ctx!.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(168, 85, 247, ${dot.opacity})`
        ctx!.fill()
      }

      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            const alpha = 0.18 * (1 - dist / 130)
            ctx!.beginPath()
            ctx!.moveTo(dots[i].x, dots[i].y)
            ctx!.lineTo(dots[j].x, dots[j].y)
            ctx!.strokeStyle = `rgba(124, 58, 237, ${alpha})`
            ctx!.lineWidth = 0.6
            ctx!.stroke()
          }
        }
      }

      raf = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  )
}
