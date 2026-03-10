'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  baseOpacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  decay: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let stars: Star[] = []
    let shootingStars: ShootingStar[] = []
    let mouseX = 0
    let mouseY = 0
    let time = 0
    let lastShootingStarTime = 0
    let targetOpacity = 1
    let currentOpacity = 1

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    function getTargetOpacity(): number {
      const val = getComputedStyle(document.documentElement).getPropertyValue('--starfield-opacity').trim()
      return parseFloat(val) || 0
    }

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      initStars()
    }

    function initStars() {
      const count = isMobile ? 120 : 250
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        radius: Math.random() * 1.2 + 0.2,
        baseOpacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }))
    }

    function spawnShootingStar() {
      shootingStars.push({
        x: Math.random() * canvas!.width * 0.8,
        y: Math.random() * canvas!.height * 0.3,
        length: Math.random() * 60 + 40,
        speed: Math.random() * 4 + 3,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        opacity: 1,
        decay: 0.015 + Math.random() * 0.01,
      })
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      // Smooth opacity transitions when theme changes
      targetOpacity = getTargetOpacity()
      currentOpacity += (targetOpacity - currentOpacity) * 0.05

      if (currentOpacity < 0.01) return

      const parallaxX = (mouseX - canvas!.width / 2) * 0.008
      const parallaxY = (mouseY - canvas!.height / 2) * 0.008

      const starColor = getComputedStyle(document.documentElement).getPropertyValue('--star-color').trim() || '200, 200, 220'

      for (const star of stars) {
        const opacity = prefersReducedMotion
          ? star.baseOpacity
          : star.baseOpacity + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.25

        const sx = star.x + parallaxX * star.radius
        const sy = star.y + parallaxY * star.radius

        ctx!.beginPath()
        ctx!.arc(sx, sy, star.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${starColor}, ${Math.max(0.05, opacity) * currentOpacity})`
        ctx!.fill()
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i]
        const tailX = s.x - Math.cos(s.angle) * s.length
        const tailY = s.y - Math.sin(s.angle) * s.length

        const gradient = ctx!.createLinearGradient(tailX, tailY, s.x, s.y)
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`)
        gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity * currentOpacity})`)

        ctx!.beginPath()
        ctx!.moveTo(tailX, tailY)
        ctx!.lineTo(s.x, s.y)
        ctx!.strokeStyle = gradient
        ctx!.lineWidth = 1.5
        ctx!.stroke()

        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        s.opacity -= s.decay

        if (s.opacity <= 0 || s.x > canvas!.width || s.y > canvas!.height) {
          shootingStars.splice(i, 1)
        }
      }
    }

    function animate() {
      time++
      draw()

      if (!prefersReducedMotion && time - lastShootingStarTime > (Math.random() * 420 + 480)) {
        if (currentOpacity > 0.3) {
          spawnShootingStar()
        }
        lastShootingStarTime = time
      }

      animationId = requestAnimationFrame(animate)
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    let resizeTimer: ReturnType<typeof setTimeout>
    function handleResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }

    resize()
    targetOpacity = getTargetOpacity()
    currentOpacity = targetOpacity

    if (prefersReducedMotion) {
      draw()
    } else {
      animate()
      window.addEventListener('mousemove', handleMouseMove)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}
