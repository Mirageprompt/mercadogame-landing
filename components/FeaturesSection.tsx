"use client"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Lock, CheckCircle, Trophy, Zap, Gamepad2, BarChart3 } from "lucide-react"
import { useRef } from "react"

const features = [
  {
    icon: Lock,
    title: "Escrow PIX",
    description:
      "Pague com segurança total. O valor fica retido na plataforma e só é liberado ao vendedor após você confirmar o recebimento do item.",
    color: "#10B981",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    icon: CheckCircle,
    title: "Verificação KYC",
    description:
      "Todos os usuários passam por verificação de identidade. Documentos validados para garantir que você só negocia com pessoas reais.",
    color: "#06B6D4",
    glow: "rgba(6,182,212,0.3)",
  },
  {
    icon: Trophy,
    title: "Sistema de Reputação",
    description:
      "Ganhe XP, badges e suba no ranking de confiança. Vendedores verificados com alta reputação vendem mais rápido.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
  },
  {
    icon: Zap,
    title: "Chat em Tempo Real",
    description:
      "Negocie diretamente pelo chat integrado com Firebase. Mensagens instantâneas, notificações push e histórico completo.",
    color: "#A855F7",
    glow: "rgba(168,85,247,0.3)",
  },
  {
    icon: Gamepad2,
    title: "Garagem Premium",
    description:
      "Consigne seus itens na Garagem Premium e venda sem esforço. Nossa equipe cuida da divulgação e negociação por você.",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.3)",
  },
  {
    icon: BarChart3,
    title: "Admin Completo",
    description:
      "Dashboard com métricas em tempo real, gestão de disputas, controle de escrow e relatórios financeiros completos.",
    color: "#6366F1",
    glow: "rgba(99,102,241,0.3)",
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-80, 80], [8, -8])
  const rotateY = useTransform(x, [-80, 80], [-8, 8])

  const Icon = feature.icon

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 + Math.floor(index / 3) * 0.15 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      className="group cursor-default"
    >
      <div
        className="h-full p-6 rounded-2xl transition-all duration-300 relative overflow-hidden"
        style={{
          background: 'rgba(15,15,26,0.9)',
          border: '1px solid rgba(124,58,237,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Hover glow background */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${feature.glow} 0%, transparent 70%)`,
          }}
        />

        {/* Hover border */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
          style={{
            border: `1px solid ${feature.color}55`,
            boxShadow: `0 0 20px ${feature.glow}, inset 0 0 20px ${feature.glow}`,
          }}
        />

        {/* Shimmer effect on hover */}
        <div
          className="absolute top-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
          }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
            style={{
              background: `${feature.color}18`,
              border: `1px solid ${feature.color}33`,
            }}
            whileHover={{
              boxShadow: `0 0 20px ${feature.glow}`,
            }}
          >
            <Icon
              size={26}
              style={{ color: feature.color }}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </motion.div>

          {/* Title */}
          <h3
            className="text-lg font-bold text-white mb-3 group-hover:transition-colors duration-300"
            style={{}}
          >
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed">
            {feature.description}
          </p>

          {/* Bottom accent */}
          <div
            className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
            style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 50%, rgba(124,58,237,0.06) 0%, transparent 55%)',
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
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(168,85,247,0.3)',
              color: '#A855F7',
            }}
          >
            Funcionalidades
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
            Tudo que você precisa
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Tecnologia de ponta para tornar cada negociação segura, rápida e recompensadora.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
