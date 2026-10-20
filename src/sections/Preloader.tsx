import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Arco } from "@/components/Arco"
import { Logo } from "@/components/Logo"

/** 12 dentes acendem conforme fontes e página carregam. */
export function Preloader() {
  const reduzido = useReducedMotion()
  const [p, setP] = useState(0)
  const [fim, setFim] = useState(false)

  useEffect(() => {
    if (reduzido) {
      setFim(true)
      return
    }
    let pronto = false
    const inicio = performance.now()
    const MIN = 600
    Promise.all([
      document.fonts.ready,
      new Promise((r) => (document.readyState === "complete" ? r(null) : window.addEventListener("load", () => r(null), { once: true }))),
    ]).then(() => (pronto = true))

    let raf = 0
    const tick = (t: number) => {
      const tempo = Math.min(1, (t - inicio) / MIN)
      const alvo = pronto ? tempo : Math.min(tempo, 0.85)
      setP((v) => v + (alvo - v) * 0.15)
      if (pronto && tempo >= 1) {
        setP(1)
        setTimeout(() => setFim(true), 250)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const seguranca = setTimeout(() => setFim(true), 5000)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(seguranca)
    }
  }, [reduzido])

  return (
    <AnimatePresence>
      {!fim && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ameixa text-white"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Carregando"
        >
          <Logo variante="empilhada" tom="escuro" className="w-44 md:w-56" />
          <Arco progresso={p} tom="escuro" className="mt-8 w-40 md:w-48" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
