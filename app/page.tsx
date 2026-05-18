"use client"
import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IntroAnimation } from "@/components/IntroAnimation"
import { ParticleField } from "@/components/ParticleField"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { HowItWorksSection } from "@/components/HowItWorksSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { GamificationSection } from "@/components/GamificationSection"
import { RegisterSection } from "@/components/RegisterSection"
import { Footer } from "@/components/Footer"

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  return (
    <main className="min-h-screen bg-[#08080F] text-white overflow-x-hidden">
      <AnimatePresence>
        {!introComplete && (
          <IntroAnimation onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <ParticleField />
            <Navbar />
            <HeroSection />
            <HowItWorksSection />
            <FeaturesSection />
            <GamificationSection />
            <RegisterSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
