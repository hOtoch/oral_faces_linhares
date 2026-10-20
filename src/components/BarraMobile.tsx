import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { IconeWhatsApp } from "@/components/BotaoWhatsApp"
import { WHATSAPP_URL } from "@/lib/contato"

/** WhatsApp fixo no rodapé do celular, depois que a hero termina. */
export function BarraMobile() {
  const [visivel, setVisivel] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 md:hidden"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-full bg-violeta py-4 text-lg font-semibold text-white shadow-[0_12px_40px_-10px_rgb(34_18_46/0.6)]"
          >
            <IconeWhatsApp className="size-6" />
            Agendar avaliação
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
