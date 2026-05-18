"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Features', href: '#features' },
    { label: 'Gamificação', href: '#gamificacao' },
  ]

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        backgroundColor: scrolled ? 'rgba(8,8,15,0.85)' : 'rgba(8,8,15,0.5)',
        borderBottom: scrolled
          ? '1px solid rgba(124,58,237,0.25)'
          : '1px solid rgba(124,58,237,0.1)',
        boxShadow: scrolled ? '0 4px 30px rgba(124,58,237,0.1)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div
              className="relative"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.6))',
              }}
            >
              <Image
                src="/logo.png"
                alt="MercadoGame"
                width={44}
                height={44}
                className="rounded-lg"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <span
              className="font-bold text-lg hidden sm:block"
              style={{
                background: 'linear-gradient(135deg, #E2E8F0, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MercadoGame
            </span>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors duration-200 relative group"
                whileHover={{ y: -1 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-500 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => scrollTo('#cadastrar')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                boxShadow: '0 0 20px rgba(124,58,237,0.4)',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(168,85,247,0.6)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              🎮 Pré-cadastrar
            </motion.button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-slate-300 hover:text-white p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t"
          style={{
            borderColor: 'rgba(124,58,237,0.2)',
            background: 'rgba(8,8,15,0.95)',
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left text-sm font-medium text-slate-300 hover:text-purple-400 py-2 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#cadastrar')}
              className="mt-2 w-full py-3 rounded-lg text-sm font-semibold text-white text-center"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
              }}
            >
              🎮 Quero me pré-cadastrar
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
