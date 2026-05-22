"use client"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { Shield, Zap, Trophy, ArrowRight, ChevronDown } from "lucide-react"

const GAMES = ["OneState RP", "RP"]

function TypingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index, words])

  return (
    <span className="inline-flex items-center">
      <span
        style={{
          background: 'linear-gradient(135deg, #C084FC, #A855F7, #7C3AED)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {displayed}
      </span>
      <motion.span
        className="inline-block w-[3px] rounded-full ml-1"
        style={{ height: '1em', background: '#A855F7' }}
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'steps(1)' }}
      />
    </span>
  )
}

const BASE_GAMERS = 500

function CounterBadge() {
  const [count, setCount] = useState<number | null>(null)
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    fetch('/api/pre-register')
      .then((r) => r.json())
      .then((d) => setCount(BASE_GAMERS + (d.count ?? 0)))
      .catch(() => setCount(BASE_GAMERS))
  }, [])

  useEffect(() => {
    if (count === null) return
    let current = 0
    const step = Math.ceil(count / 60)
    const interval = setInterval(() => {
      current = Math.min(current + step, count)
      setDisplayCount(current)
      if (current >= count) clearInterval(interval)
    }, 20)
    return () => clearInterval(interval)
  }, [count])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
      style={{
        background: 'rgba(124,58,237,0.15)',
        border: '1px solid rgba(168,85,247,0.3)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="flex -space-x-2">
        {['🎮', '⚔️', '🏆'].map((emoji, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
            style={{
              background: `rgba(124,58,237,${0.4 + i * 0.1})`,
              border: '2px solid rgba(168,85,247,0.5)',
              zIndex: 3 - i,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
      <span className="text-sm font-medium text-slate-200">
        <span
          className="font-bold text-lg"
          style={{
            background: 'linear-gradient(135deg, #C084FC, #A855F7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          +{displayCount}
        </span>{' '}
        gamers já na lista
      </span>
    </motion.div>
  )
}

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const badges = [
    { icon: Shield, text: 'Verificação de Identidade', color: '#06B6D4' },
    { icon: Zap, text: 'PIX com Escrow', color: '#A855F7' },
    { icon: Trophy, text: 'Sistema Gamificado', color: '#F59E0B' },
  ]

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16"
      style={{
        background:
          'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 65%)',
      }}
    >
      {/* Decorative orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Pre-title badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold tracking-wider uppercase"
          style={{
            background: 'rgba(124,58,237,0.2)',
            border: '1px solid rgba(168,85,247,0.4)',
            color: '#C084FC',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
          </span>
          Pré-lançamento — Acesso antecipado aberto
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6"
        >
          <span
            style={{
              background: 'linear-gradient(180deg, #F8FAFC 0%, #CBD5E1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
            }}
          >
            O Marketplace
          </span>
          <span className="block">
            <TypingText words={GAMES} />
            <span
              style={{
                background: 'linear-gradient(180deg, #F8FAFC 0%, #CBD5E1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {' '}do Brasil
            </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Compre, venda e troque itens de jogos com segurança.{' '}
          <span className="text-purple-300 font-medium">PIX escrow</span>,{' '}
          <span className="text-purple-300 font-medium">reputação verificada</span> e{' '}
          <span className="text-purple-300 font-medium">sistema de gamificação</span> para gamers brasileiros.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            onClick={() => scrollTo('#cadastrar')}
            className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
              boxShadow: '0 0 30px rgba(124,58,237,0.5), 0 4px 20px rgba(0,0,0,0.3)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 50px rgba(168,85,247,0.7), 0 4px 20px rgba(0,0,0,0.3)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            🎮 Quero me pré-cadastrar
            <ArrowRight size={18} />
          </motion.button>

          <motion.button
            onClick={() => scrollTo('#como-funciona')}
            className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all"
            style={{
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(168,85,247,0.4)',
              color: '#C084FC',
            }}
            whileHover={{
              scale: 1.03,
              borderColor: 'rgba(168,85,247,0.8)',
              backgroundColor: 'rgba(124,58,237,0.15)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            Ver como funciona
          </motion.button>
        </motion.div>

        {/* Counter */}
        <CounterBadge />

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {badges.map((badge, i) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
              style={{
                background: 'rgba(15,15,26,0.8)',
                border: `1px solid ${badge.color}33`,
                color: badge.color,
              }}
            >
              <badge.icon size={14} />
              {badge.text}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={() => scrollTo('#como-funciona')}
      >
        <span className="text-xs tracking-widest uppercase">Explorar</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
