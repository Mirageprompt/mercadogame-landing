"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Particle {
  id: number
  angle: number
  distance: number
  size: number
  color: string
  delay: number
  duration: number
}

interface IntroAnimationProps {
  onComplete: () => void
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'black' | 'logo' | 'text' | 'hold' | 'warp' | 'done'>('black')
  const [particles, setParticles] = useState<Particle[]>([])

  // Generate particles
  useEffect(() => {
    const colors = ['#A855F7', '#C084FC', '#E2E8F0', '#7C3AED', '#DDD6FE']
    const p: Particle[] = Array.from({ length: 32 }, (_, i) => ({
      id: i,
      angle: (360 / 32) * i + (Math.random() - 0.5) * 25,
      distance: 80 + Math.random() * 160,
      size: 2 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.4,
      duration: 0.7 + Math.random() * 0.9,
    }))
    setParticles(p)
  }, [])

  // Phase timeline
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('logo'), 300),
      setTimeout(() => setPhase('text'), 1300),
      setTimeout(() => setPhase('hold'), 2300),
      setTimeout(() => setPhase('warp'), 3300),
      setTimeout(() => {
        setPhase('done')
        onComplete()
      }, 4100),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  if (phase === 'done') return null

  function particlePos(angle: number, distance: number) {
    const rad = (angle * Math.PI) / 180
    return {
      x: Math.cos(rad) * distance,
      y: Math.sin(rad) * distance,
    }
  }

  const showParticles = phase === 'logo' || phase === 'text' || phase === 'hold'
  const showText = phase === 'text' || phase === 'hold'

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#08080F' }}
      animate={
        phase === 'warp'
          ? { backgroundColor: '#1a0035' }
          : { backgroundColor: '#08080F' }
      }
      transition={{ duration: 0.5 }}
    >
      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
        }}
      />

      {/* Initial pulsing light */}
      <AnimatePresence>
        {phase === 'black' && (
          <motion.div
            key="initial-dot"
            className="absolute rounded-full"
            style={{
              width: 8,
              height: 8,
              background: 'radial-gradient(circle, #A855F7, #7C3AED)',
              boxShadow: '0 0 20px #A855F7, 0 0 40px #7C3AED',
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.4, 1, 0.4],
              boxShadow: [
                '0 0 10px #A855F7',
                '0 0 40px #A855F7, 0 0 80px #7C3AED',
                '0 0 10px #A855F7',
              ],
            }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Central container */}
      <div className="relative flex items-center justify-center" style={{ zIndex: 5 }}>

        {/* Aura glow behind logo */}
        <AnimatePresence>
          {showParticles && (
            <motion.div
              key="aura"
              className="absolute rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(168,85,247,0.15) 40%, transparent 70%)',
              }}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width: phase === 'hold' ? 600 : 350,
                height: phase === 'hold' ? 600 : 350,
                opacity: phase === 'hold' ? [0.7, 1, 0.7] : 0.7,
              }}
              transition={{
                duration: 0.9,
                repeat: phase === 'hold' ? Infinity : 0,
                repeatType: 'reverse',
              }}
              exit={{ opacity: 0, scale: 0 }}
            />
          )}
        </AnimatePresence>

        {/* Particles */}
        <AnimatePresence>
          {showParticles &&
            particles.map((p) => {
              const pos = particlePos(p.angle, p.distance)
              return (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                    boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: pos.x,
                    y: pos.y,
                    opacity: [0, 1, 0.7, 0.3, 0],
                    scale: [0, 1.5, 1.2, 0.8, 0],
                  }}
                  transition={{
                    delay: p.delay,
                    duration: p.duration,
                    ease: 'easeOut',
                  }}
                />
              )
            })}
        </AnimatePresence>

        {/* Logo */}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0.05, opacity: 0, filter: 'blur(24px)' }}
          animate={
            phase === 'black'
              ? { scale: 0.05, opacity: 0, filter: 'blur(24px)' }
              : phase === 'warp'
              ? {
                  scale: 14,
                  opacity: 0,
                  filter: 'blur(60px)',
                }
              : {
                  scale: 1,
                  opacity: 1,
                  filter: 'blur(0px)',
                }
          }
          transition={{
            duration: phase === 'warp' ? 0.75 : 0.9,
            ease: phase === 'warp' ? [0.4, 0, 1, 1] : [0, 0, 0.2, 1],
          }}
          style={
            phase === 'hold'
              ? {
                  filter: 'drop-shadow(0 0 20px #A855F7) drop-shadow(0 0 40px #7C3AED)',
                }
              : {}
          }
        >
          <motion.div
            animate={
              phase === 'hold'
                ? {
                    filter: [
                      'drop-shadow(0 0 10px #A855F7)',
                      'drop-shadow(0 0 30px #A855F7) drop-shadow(0 0 60px #7C3AED)',
                      'drop-shadow(0 0 10px #A855F7)',
                    ],
                  }
                : {}
            }
            transition={
              phase === 'hold'
                ? { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }
                : {}
            }
          >
            <Image
              src="/logo.png"
              alt="MercadoGame"
              width={280}
              height={280}
              priority
              style={{ objectFit: 'contain' }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* "ENTRE NO JOGO" text */}
      <AnimatePresence>
        {showText && (
          <motion.div
            key="tagline"
            className="absolute bottom-[28%] flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.p
              className="text-sm tracking-[0.6em] uppercase font-medium"
              style={{ color: 'rgba(168,85,247,0.9)' }}
              animate={{
                opacity: phase === 'hold' ? [0.6, 1, 0.6] : 1,
              }}
              transition={
                phase === 'hold' ? { repeat: Infinity, duration: 2 } : {}
              }
            >
              Carregando...
            </motion.p>

            {/* Loading bar */}
            <div
              className="rounded-full overflow-hidden"
              style={{
                width: 160,
                height: 2,
                background: 'rgba(124,58,237,0.2)',
              }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #7C3AED, #A855F7, #C084FC)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: phase === 'hold' ? '100%' : '60%' }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Warp flash */}
      <AnimatePresence>
        {phase === 'warp' && (
          <motion.div
            key="warp-flash"
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 20 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.7, times: [0, 0.3, 1] }}
            exit={{ opacity: 0 }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background:
                  'radial-gradient(circle at center, rgba(168,85,247,0.6) 0%, rgba(124,58,237,0.3) 40%, transparent 70%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
