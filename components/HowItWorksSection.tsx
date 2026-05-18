"use client"
import { motion } from "framer-motion"
import { ClipboardList, Gamepad2, Lock, Star } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Cadastre-se e verifique sua identidade",
    description:
      "Crie sua conta em minutos. Envie seu documento e confirme sua identidade para poder comprar e vender com segurança na plataforma.",
    color: "#A855F7",
    side: "left",
  },
  {
    number: "02",
    icon: Gamepad2,
    title: "Encontre o item que procura",
    description:
      "Navegue pelo catálogo de itens, skins, contas e muito mais. Use filtros por jogo, preço e reputação do vendedor.",
    color: "#06B6D4",
    side: "right",
  },
  {
    number: "03",
    icon: Lock,
    title: "Negocie com segurança via escrow",
    description:
      "Pague via PIX com proteção de escrow. O valor fica retido até você confirmar o recebimento do item. Zero risco de fraude.",
    color: "#10B981",
    side: "left",
  },
  {
    number: "04",
    icon: Star,
    title: "Avalie e suba no ranking",
    description:
      "Após a transação, avalie o vendedor e ganhe XP. Construa sua reputação e desbloqueie badges exclusivos de confiança.",
    color: "#F59E0B",
    side: "right",
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(168,85,247,0.3)',
              color: '#A855F7',
            }}
          >
            Como funciona
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black"
            style={{
              background: 'linear-gradient(135deg, #F8FAFC, #CBD5E1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Simples, Seguro e Épico
          </h2>
          <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto">
            Do cadastro à primeira negociação em menos de 5 minutos.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{
              background:
                'linear-gradient(180deg, transparent, #7C3AED 15%, #A855F7 50%, #7C3AED 85%, transparent)',
            }}
          />

          <div className="flex flex-col gap-16">
            {steps.map((step, index) => {
              const isLeft = step.side === 'left'
              const Icon = step.icon

              return (
                <motion.div
                  key={step.number}
                  initial={{
                    opacity: 0,
                    x: isLeft ? -50 : 50,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Card */}
                  <div className="flex-1">
                    <motion.div
                      className="glass-card p-6 sm:p-8 group"
                      whileHover={{ scale: 1.02 }}
                      style={{ transformOrigin: isLeft ? 'right center' : 'left center' }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className="p-3 rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                          style={{
                            background: `${step.color}22`,
                            border: `1px solid ${step.color}44`,
                          }}
                        >
                          <Icon
                            size={24}
                            style={{ color: step.color }}
                          />
                        </div>

                        <div>
                          <span
                            className="text-xs font-bold tracking-widest uppercase mb-2 block"
                            style={{ color: `${step.color}99` }}
                          >
                            Passo {step.number}
                          </span>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {step.title}
                          </h3>
                          <p className="text-slate-400 leading-relaxed text-sm">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center number bubble */}
                  <motion.div
                    className="relative z-10 flex-shrink-0"
                    whileInView={{ scale: [0.5, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center font-black text-xl"
                      style={{
                        background: `radial-gradient(circle, ${step.color}33, ${step.color}11)`,
                        border: `2px solid ${step.color}88`,
                        boxShadow: `0 0 20px ${step.color}44, 0 0 40px ${step.color}22`,
                        color: step.color,
                      }}
                    >
                      {step.number}
                    </div>
                  </motion.div>

                  {/* Empty side for alignment */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
