"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { User, Mail, Phone, Gamepad2, CheckCircle, AlertCircle, Loader2, Rocket } from "lucide-react"
import confetti from "canvas-confetti"

const GAMES = [
  "OneState RP",
]

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0,2)}) ${digits.slice(2)}`
  if (digits.length <= 11)
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`
  return value
}

function Countdown() {
  // Launch date: 15 days from today
  const launchDate = new Date('2026-06-06T00:00:00')
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  })

  useEffect(() => {
    const calc = () => {
      const diff = launchDate.getTime() - Date.now()
      if (diff <= 0) return
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const interval = setInterval(calc, 1000)
    return () => clearInterval(interval)
  }, [])

  const units = [
    { label: 'Dias', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Seg', value: timeLeft.seconds },
  ]

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center font-black text-2xl relative overflow-hidden"
            style={{
              background: 'rgba(124,58,237,0.2)',
              border: '1px solid rgba(168,85,247,0.4)',
              color: '#C084FC',
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={unit.value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">{unit.label}</p>
        </div>
      ))}
    </div>
  )
}

function fireConfetti() {
  const duration = 3000
  const end = Date.now() + duration
  const colors = ['#7C3AED', '#A855F7', '#C084FC', '#F59E0B', '#FCD34D']

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()

  // Center burst
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors,
    gravity: 0.8,
  })
}

export function RegisterSection() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', favoriteGame: 'OneState RP',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [finalCount, setFinalCount] = useState<number | null>(null)

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = 'Digite seu nome completo'
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email || !emailRe.test(form.email))
      errs.email = 'Digite um email válido'
    if (!form.phone || form.phone.replace(/\D/g, '').length < 10)
      errs.phone = 'Digite seu telefone com DDD'
    if (!form.favoriteGame)
      errs.favoriteGame = 'Selecione um jogo'
    return errs
  }

  const handleChange = (field: string, value: string) => {
    if (field === 'phone') value = formatPhone(value)
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('loading')
    try {
      const res = await fetch('/api/pre-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.replace(/\D/g, '') || null,
          favoriteGame: form.favoriteGame || null,
          utmSource: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_source') : null,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (data.alreadyExists) {
          setErrorMsg('Esse email já está na lista! 🎉')
        } else {
          setErrorMsg(data.error || 'Erro ao cadastrar. Tente novamente.')
        }
        setStatus('error')
        return
      }

      setFinalCount(data.count)
      setStatus('success')
      fireConfetti()
    } catch {
      setErrorMsg('Erro de conexão. Verifique sua internet.')
      setStatus('error')
    }
  }

  const inputBase = "w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 outline-none input-game"

  if (status === 'success') {
    return (
      <section id="cadastrar" className="relative py-24 px-4">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-center p-10 rounded-2xl"
            style={{
              background: 'rgba(15,15,26,0.95)',
              border: '1px solid rgba(16,185,129,0.4)',
              boxShadow: '0 0 40px rgba(16,185,129,0.15)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: 'rgba(16,185,129,0.2)',
                border: '2px solid rgba(16,185,129,0.5)',
                boxShadow: '0 0 30px rgba(16,185,129,0.3)',
              }}
            >
              <CheckCircle size={44} style={{ color: '#10B981' }} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black text-white mb-3"
            >
              Você está na lista! 🎉
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 mb-6"
            >
              Acesso antecipado garantido. Você será notificado assim que o MercadoGame abrir.
            </motion.p>

            {finalCount && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full"
                style={{
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  color: '#6EE7B7',
                }}
              >
                <Rocket size={16} />
                <span className="text-sm font-semibold">
                  Você é o gamer #{finalCount} na lista!
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="cadastrar" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(168,85,247,0.3)',
              color: '#A855F7',
            }}
          >
            Pré-cadastro
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{
              background: 'linear-gradient(135deg, #F8FAFC, #CBD5E1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Garanta seu Acesso Antecipado
          </h2>
          <p className="text-slate-400">
            Os primeiros cadastrados terão vantagens exclusivas no lançamento.
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-center text-xs text-slate-500 uppercase tracking-widest mb-4">
            Lançamento em
          </p>
          <Countdown />
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(15,15,26,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(124,58,237,0.35)',
            boxShadow: '0 0 40px rgba(124,58,237,0.15), 0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Top glow border */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, #7C3AED, #A855F7, #7C3AED, transparent)',
            }}
          />

          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 ml-1 uppercase tracking-wide">
                Nome completo *
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`${inputBase} pl-10`}
                  style={{
                    borderColor: errors.name ? 'rgba(239,68,68,0.6)' : undefined,
                  }}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs mt-1.5 ml-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 ml-1 uppercase tracking-wide">
                Email *
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`${inputBase} pl-10`}
                  style={{
                    borderColor: errors.email ? 'rgba(239,68,68,0.6)' : undefined,
                  }}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5 ml-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 ml-1 uppercase tracking-wide">
                Telefone *
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`${inputBase} pl-10`}
                  style={{
                    borderColor: errors.phone ? 'rgba(239,68,68,0.6)' : undefined,
                  }}
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1.5 ml-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.phone}
                </p>
              )}
            </div>

            {/* Game */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 ml-1 uppercase tracking-wide">
                Jogo *
              </label>
              <div
                className={`${inputBase} pl-10 flex items-center cursor-default`}
                style={{
                  background: 'rgba(15,15,26,0.9)',
                  border: `1px solid ${errors.favoriteGame ? 'rgba(239,68,68,0.6)' : 'rgba(124,58,237,0.3)'}`,
                  color: '#E2E8F0',
                  position: 'relative',
                }}
              >
                <Gamepad2 size={16} style={{ position: 'absolute', left: 14, color: '#A855F7' }} />
                <span style={{ paddingLeft: 8, color: '#C084FC', fontWeight: 600 }}>🎮 OneState RP</span>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: '#FCA5A5',
                  }}
                >
                  <AlertCircle size={16} />
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded-xl font-bold text-base text-white relative overflow-hidden transition-all duration-300"
              style={{
                background:
                  status === 'loading'
                    ? 'rgba(124,58,237,0.5)'
                    : 'linear-gradient(135deg, #7C3AED, #A855F7)',
                boxShadow:
                  status === 'loading'
                    ? 'none'
                    : '0 0 30px rgba(124,58,237,0.5), 0 4px 20px rgba(0,0,0,0.3)',
              }}
              whileHover={
                status !== 'loading'
                  ? {
                      scale: 1.02,
                      boxShadow: '0 0 50px rgba(168,85,247,0.7)',
                    }
                  : {}
              }
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer */}
              {status !== 'loading' && (
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                    animation: 'shimmer 2s linear infinite',
                    backgroundSize: '200% 100%',
                  }}
                />
              )}

              <span className="relative flex items-center justify-center gap-2">
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  <>
                    🚀 Garantir Acesso Antecipado
                  </>
                )}
              </span>
            </motion.button>

            <p className="text-center text-xs text-slate-600">
              Sem spam. Sem taxas. Apenas notificação de lançamento.
            </p>
          </form>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-6 mt-6 flex-wrap"
        >
          {['🔒 100% seguro', '✅ Zero spam', '🎮 Só para gamers'].map((item) => (
            <span key={item} className="text-xs text-slate-500">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
