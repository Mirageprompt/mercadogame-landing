"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Trophy, Target, Flame, Star, Crown, Zap, Shield } from "lucide-react"

const badges = [
  {
    id: "legendary",
    label: "Lendário",
    emoji: "👑",
    description: "Top 1% da plataforma",
    gradient: "linear-gradient(135deg, #F59E0B, #FCD34D, #F97316)",
    glow: "rgba(245,158,11,0.6)",
    glowOuter: "rgba(245,158,11,0.2)",
    xp: "50.000+ XP",
    textColor: "#FCD34D",
  },
  {
    id: "diamond",
    label: "Diamante",
    emoji: "💎",
    description: "Elite verificado",
    gradient: "linear-gradient(135deg, #06B6D4, #67E8F9, #0284C7)",
    glow: "rgba(6,182,212,0.6)",
    glowOuter: "rgba(6,182,212,0.2)",
    xp: "20.000+ XP",
    textColor: "#67E8F9",
  },
  {
    id: "gold",
    label: "Ouro",
    emoji: "🥇",
    description: "Trader experiente",
    gradient: "linear-gradient(135deg, #D97706, #FCD34D, #B45309)",
    glow: "rgba(217,119,6,0.5)",
    glowOuter: "rgba(217,119,6,0.15)",
    xp: "10.000+ XP",
    textColor: "#FCD34D",
  },
  {
    id: "silver",
    label: "Prata",
    emoji: "🥈",
    description: "Confiável e ativo",
    gradient: "linear-gradient(135deg, #6B7280, #D1D5DB, #9CA3AF)",
    glow: "rgba(156,163,175,0.4)",
    glowOuter: "rgba(156,163,175,0.1)",
    xp: "5.000+ XP",
    textColor: "#D1D5DB",
  },
  {
    id: "bronze",
    label: "Bronze",
    emoji: "🥉",
    description: "Começando a jornada",
    gradient: "linear-gradient(135deg, #92400E, #D97706, #78350F)",
    glow: "rgba(146,64,14,0.4)",
    glowOuter: "rgba(146,64,14,0.1)",
    xp: "0 – 5.000 XP",
    textColor: "#D97706",
  },
]

const missions = [
  { icon: Zap, text: "Completar 5 vendas esta semana", xp: "+500 XP", done: true },
  { icon: Star, text: "Receber 10 avaliações 5 estrelas", xp: "+300 XP", done: true },
  { icon: Shield, text: "Verificar conta com selfie", xp: "+200 XP", done: false },
  { icon: Target, text: "Vender em 3 categorias diferentes", xp: "+400 XP", done: false },
  { icon: Flame, text: "Login por 7 dias seguidos", xp: "+150 XP", done: false },
]

function XPBar({ targetPercent }: { targetPercent: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setWidth(targetPercent), 300)
      return () => clearTimeout(timer)
    }
  }, [inView, targetPercent])

  return (
    <div ref={ref}>
      <div className="flex justify-between text-xs text-slate-400 mb-2">
        <span>Nível 42 — Ouro</span>
        <span className="text-purple-400 font-semibold">
          7.240 / 10.000 XP
        </span>
      </div>
      <div
        className="rounded-full overflow-hidden"
        style={{ height: 10, background: 'rgba(124,58,237,0.15)' }}
      >
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #7C3AED, #A855F7, #C084FC)',
            width: `${width}%`,
            transition: 'width 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Shimmer */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite',
            }}
          />
        </motion.div>
      </div>
      <div className="flex justify-between text-xs text-slate-500 mt-1.5">
        <span>0 XP</span>
        <span>10.000 XP — Diamante</span>
      </div>
    </div>
  )
}

export function GamificationSection() {
  return (
    <section
      id="gamificacao"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.07) 0%, transparent 55%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{
              background: 'rgba(245,158,11,0.15)',
              border: '1px solid rgba(245,158,11,0.3)',
              color: '#F59E0B',
            }}
          >
            Gamificação
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black mb-4 flex items-center justify-center gap-4"
          >
            <Trophy
              size={44}
              style={{ color: '#F59E0B', filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.5))' }}
            />
            <span
              style={{
                background: 'linear-gradient(135deg, #F8FAFC, #CBD5E1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Suba no Ranking
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Cada negociação conta. Ganhe XP, conquiste badges e mostre que você é o melhor trader do Brasil.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Badges Column */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg font-bold text-slate-200 mb-6"
            >
              Ranks da Plataforma
            </motion.h3>

            <div className="flex flex-col gap-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-xl group cursor-default"
                  style={{
                    background: 'rgba(15,15,26,0.8)',
                    border: `1px solid ${badge.glow.replace('0.6', '0.2')}`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {/* Badge icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 relative"
                    style={{
                      background: badge.gradient,
                      boxShadow: `0 0 15px ${badge.glow}, 0 0 30px ${badge.glowOuter}`,
                    }}
                    animate={{
                      rotate: index === 0 ? [0, 3, -3, 0] : 0,
                    }}
                    transition={
                      index === 0
                        ? { repeat: Infinity, duration: 3, ease: 'easeInOut' }
                        : {}
                    }
                  >
                    {badge.emoji}
                    {index === 0 && (
                      <div
                        className="absolute inset-0 rounded-xl animate-ping"
                        style={{
                          background: `${badge.glow}`,
                          opacity: 0.2,
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="font-bold text-base"
                        style={{ color: badge.textColor }}
                      >
                        {badge.label}
                      </span>
                      {index === 0 && (
                        <Crown size={14} style={{ color: badge.textColor }} />
                      )}
                    </div>
                    <p className="text-slate-500 text-xs">{badge.description}</p>
                  </div>

                  {/* XP requirement */}
                  <div
                    className="text-right flex-shrink-0 px-2 py-1 rounded-lg"
                    style={{
                      background: `${badge.glowOuter}`,
                      border: `1px solid ${badge.glow.replace('0.6', '0.15')}`,
                    }}
                  >
                    <p className="text-xs font-semibold" style={{ color: badge.textColor }}>
                      {badge.xp}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* XP & Missions Column */}
          <div className="flex flex-col gap-6">
            {/* XP Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(15,15,26,0.9)',
                border: '1px solid rgba(124,58,237,0.25)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.4)' }}
                >
                  <Zap size={20} style={{ color: '#A855F7' }} />
                </div>
                <div>
                  <p className="text-white font-bold">Sua Progressão</p>
                  <p className="text-xs text-slate-500">Rank atual: Ouro</p>
                </div>
              </div>
              <XPBar targetPercent={72} />
            </motion.div>

            {/* Missions Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(15,15,26,0.9)',
                border: '1px solid rgba(124,58,237,0.25)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)' }}
                  >
                    <Target size={20} style={{ color: '#F59E0B' }} />
                  </div>
                  <div>
                    <p className="text-white font-bold">Missões Semanais</p>
                    <p className="text-xs text-slate-500">2 de 5 completas</p>
                  </div>
                </div>
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{
                    background: 'rgba(245,158,11,0.15)',
                    color: '#F59E0B',
                    border: '1px solid rgba(245,158,11,0.3)',
                  }}
                >
                  Semanal
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {missions.map((mission, i) => {
                  const Icon = mission.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.07 }}
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{
                        background: mission.done
                          ? 'rgba(16,185,129,0.08)'
                          : 'rgba(255,255,255,0.02)',
                        border: mission.done
                          ? '1px solid rgba(16,185,129,0.2)'
                          : '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: mission.done
                            ? 'rgba(16,185,129,0.2)'
                            : 'rgba(168,85,247,0.1)',
                        }}
                      >
                        <Icon
                          size={15}
                          style={{ color: mission.done ? '#10B981' : '#A855F7' }}
                        />
                      </div>
                      <p
                        className="flex-1 text-sm"
                        style={{
                          color: mission.done ? '#6EE7B7' : '#CBD5E1',
                          textDecoration: mission.done ? 'line-through' : 'none',
                          opacity: mission.done ? 0.7 : 1,
                        }}
                      >
                        {mission.text}
                      </p>
                      <span
                        className="text-xs font-bold flex-shrink-0"
                        style={{ color: mission.done ? '#6EE7B7' : '#A855F7' }}
                      >
                        {mission.xp}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
