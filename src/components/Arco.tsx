import { motion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * O arco dentário de 12 dentes: assinatura gráfica do site (ver DESIGN.md).
 * Visto de cima (oclusal): incisivos no topo, molares nas pontas.
 */

const CX = 150
const CY = 150
const RX = 118
const RY = 124

export const DENTES = Array.from({ length: 12 }, (_, i) => {
  // de 0,07π a 0,93π: um "U" invertido com abertura para baixo
  const t = 0.07 + (0.86 * i) / 11
  const theta = Math.PI * t
  const x = CX - RX * Math.cos(theta)
  const y = CY - RY * Math.sin(theta)
  // tangente à elipse para rotacionar o dente
  const dx = RX * Math.sin(theta)
  const dy = -RY * Math.cos(theta)
  const rot = (Math.atan2(dy, dx) * 180) / Math.PI
  const centralidade = Math.sin(theta) // 1 nos incisivos, ~0 nos molares
  const w = 38 - 14 * centralidade // molares mais largos
  const h = 30 + 4 * (1 - centralidade)
  return { x, y, rot, w, h }
})

// curva guia (gengiva), por dentro do arco
const GUIA = (() => {
  const r = (t: number) => [CX - (RX - 30) * Math.cos(Math.PI * t), CY - (RY - 30) * Math.sin(Math.PI * t)]
  const [x0, y0] = r(0.02)
  const [x1, y1] = r(0.98)
  return `M ${x0} ${y0 + 20} L ${x0} ${y0} A ${RX - 30} ${RY - 30} 0 0 1 ${x1} ${y1} L ${x1} ${y1 + 20}`
})()

// posições dos implantes (protocolo com 4 implantes, ilustrativo)
const IMPLANTES = [1.5, 4, 7, 9.5]

export type EstadoArco = "contorno" | "plano" | "implantes" | "provisorio" | "definitivo"

type Props = {
  /** 0 → 1: quantos dentes acendem (modo progresso). */
  progresso?: number
  /** Modo protocolo: estado clínico ilustrado. */
  estado?: EstadoArco
  tom?: "claro" | "escuro"
  className?: string
  titulo?: string
}

export function Arco({ progresso, estado, tom = "escuro", className, titulo }: Props) {
  const escuro = tom === "escuro"
  const apagado = escuro ? "rgb(255 255 255 / 0.12)" : "rgb(74 36 120 / 0.12)"
  const contorno = escuro ? "rgb(255 255 255 / 0.35)" : "rgb(74 36 120 / 0.35)"
  const aceso = escuro ? "#ffffff" : "var(--violeta)"
  const provisorio = "var(--lilas)"

  const acesos = progresso !== undefined ? progresso * 12 : 0
  const mostrarImplantes = estado === "implantes" || estado === "provisorio" || estado === "definitivo"

  return (
    <svg viewBox="0 0 300 190" className={cn("block", className)} role={titulo ? "img" : undefined} aria-label={titulo} aria-hidden={titulo ? undefined : true}>
      {/* gengiva / curva guia */}
      <motion.path
        d={GUIA}
        fill="none"
        stroke={estado === "plano" ? contorno : apagado}
        strokeWidth={estado === "plano" ? 1.5 : 1}
        strokeDasharray={estado === "plano" ? "4 6" : undefined}
        animate={{ opacity: estado === "contorno" ? 0.4 : 1 }}
      />

      {DENTES.map((d, i) => {
        let fill = apagado
        let stroke = "transparent"
        let opacidade = 1
        if (progresso !== undefined) {
          const f = Math.max(0, Math.min(1, acesos - i))
          fill = f >= 1 ? aceso : apagado
          if (f > 0 && f < 1) fill = "var(--petala)"
          opacidade = f > 0 ? 1 : 1
        } else if (estado) {
          if (estado === "contorno") {
            fill = "transparent"
            stroke = contorno
          } else if (estado === "plano") {
            fill = "transparent"
            stroke = contorno
          } else if (estado === "implantes") {
            fill = "transparent"
            stroke = apagado
          } else if (estado === "provisorio") {
            fill = provisorio
          } else if (estado === "definitivo") {
            fill = aceso
          }
        }
        return (
          <motion.rect
            key={i}
            x={d.x - d.w / 2}
            y={d.y - d.h / 2}
            width={d.w}
            height={d.h}
            rx={Math.min(d.w, d.h) * 0.42}
            transform={`rotate(${d.rot} ${d.x} ${d.y})`}
            initial={false}
            animate={{ fill, stroke, opacity: opacidade }}
            transition={{ duration: 0.45, delay: estado ? i * 0.03 : 0, ease: [0.76, 0, 0.24, 1] }}
            strokeWidth={1.4}
            strokeDasharray={estado === "plano" ? "3 3" : undefined}
          />
        )
      })}

      {IMPLANTES.map((pos, k) => {
        const a = DENTES[Math.floor(pos)]
        const b = DENTES[Math.min(11, Math.ceil(pos))]
        const f = pos - Math.floor(pos)
        const x = a.x + (b.x - a.x) * f
        const y = a.y + (b.y - a.y) * f + 34
        return (
          <motion.g
            key={k}
            initial={false}
            animate={{ opacity: mostrarImplantes ? 1 : 0, y: mostrarImplantes ? 0 : 8 }}
            transition={{ duration: 0.5, delay: mostrarImplantes ? 0.15 + k * 0.08 : 0 }}
          >
            <line x1={x} y1={y - 12} x2={x} y2={y + 10} stroke="var(--petala)" strokeWidth={4} strokeLinecap="round" />
            <circle cx={x} cy={y - 14} r={4} fill="var(--petala)" />
          </motion.g>
        )
      })}
    </svg>
  )
}
