import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type Props = {
  children: string
  como?: "h2" | "h3"
  className?: string
}

/** Título com mask reveal de baixo para cima, uma vez, ao entrar na tela. */
export function Titulo({ children, como = "h2", className }: Props) {
  const reduzido = useReducedMotion()
  const Tag = como
  const palavras = children.split(" ")
  return (
    <Tag className={cn("titulo-lg", className)}>
      {palavras.map((p, k) => (
        <span key={k} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduzido ? false : { y: "105%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.6, delay: k * 0.05, ease: [0.76, 0, 0.24, 1] }}
          >
            {p}
            {k < palavras.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
