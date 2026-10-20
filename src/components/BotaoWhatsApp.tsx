import { useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { cn } from "@/lib/utils"
import { WHATSAPP_URL } from "@/lib/contato"

type Props = {
  tamanho?: "md" | "lg"
  variante?: "solido" | "claro"
  texto?: string
  className?: string
}

/** CTA principal: abre o WhatsApp com a mensagem pronta. Magnético no desktop. */
export function BotaoWhatsApp({ tamanho = "md", variante = "solido", texto = "Agendar avaliação no WhatsApp", className }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduzido = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 })

  const mover = (e: React.PointerEvent) => {
    if (reduzido || e.pointerType !== "mouse" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25)
  }
  const sair = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x, y }}
      onPointerMove={mover}
      onPointerLeave={sair}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center gap-3 rounded-full font-semibold transition-colors",
        tamanho === "lg" ? "px-7 py-4 text-lg" : "px-5 py-3 text-base",
        variante === "solido"
          ? "bg-white text-violeta shadow-[0_10px_40px_-12px_rgb(196_123_174/0.7)] hover:bg-lilas-claro"
          : "bg-violeta text-white shadow-[0_10px_30px_-14px_rgb(74_36_120/0.8)] hover:bg-violeta-claro",
        className
      )}
    >
      <IconeWhatsApp className={tamanho === "lg" ? "size-6" : "size-5"} />
      <span>{texto}</span>
    </motion.a>
  )
}

export function IconeWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}
