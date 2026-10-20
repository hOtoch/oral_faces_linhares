import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Arco } from "@/components/Arco"
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp"
import { fases, faseAtual } from "@/media/heroTimeline"
import { liberarScroll, pararScroll, rolarPara } from "@/lib/scroll"

type FramesManifest = { count: number; desktop: string; mobile?: string; ext?: string }

const LERP = 0.08
const SENSIBILIDADE = 0.0005

/**
 * Hero com vídeo controlado pelo scroll (variante A do PROMPT_BASE).
 * Enquanto o progresso não chega a 1, wheel/touch/teclado avançam os frames e a página não rola.
 * Sem frames em public/frames/hero/, o canvas desenha um placeholder (VID-01).
 */
export function Hero() {
  const reduzido = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const alvo = useRef(0)
  const atual = useRef(0)
  const frames = useRef<HTMLImageElement[]>([])
  const [progresso, setProgresso] = useState(0)
  const [temFrames, setTemFrames] = useState(false)

  // carrega frames, se existirem. Imagens fora do DOM não aceitam loading="lazy" (nunca carregariam),
  // então a fila é manual: primeiro um a cada 8 frames (scrub grosso já funciona), depois o resto.
  useEffect(() => {
    let cancelado = false
    fetch("/frames/hero/manifest.json", { cache: "no-cache" })
      .then((r) => (r.ok && r.headers.get("content-type")?.includes("json") ? r.json() : null))
      .then((m: FramesManifest | null) => {
        if (!m?.count || cancelado) return
        const mobile = window.innerWidth < 768 && m.mobile
        const dir = mobile ? m.mobile! : m.desktop
        const ext = m.ext ?? "webp"
        const lista: HTMLImageElement[] = Array.from({ length: m.count }, () => new Image())
        frames.current = lista

        const ordem = [...Array(m.count).keys()]
        const fila = [...ordem.filter((i) => i % 8 === 0), ...ordem.filter((i) => i % 8 !== 0)]
        let proximo = 0
        const carregar = () => {
          if (cancelado || proximo >= fila.length) return
          const i = fila[proximo++]
          const img = lista[i]
          const fim = () => {
            if (cancelado) return
            if (i === 0 && img.naturalWidth) setTemFrames(true)
            carregar()
          }
          img.onload = fim
          img.onerror = fim
          img.decoding = "async"
          img.src = `${dir}/${String(i + 1).padStart(4, "0")}.${ext}`
        }
        for (let k = 0; k < 6; k++) carregar() // 6 downloads em paralelo
      })
      .catch(() => {})
    return () => {
      cancelado = true
    }
  }, [])

  // trava de scroll + scrub
  useEffect(() => {
    if (reduzido) {
      alvo.current = atual.current = 1
      setProgresso(1)
      return
    }

    const ativo = () => window.scrollY <= 2
    const clamp = (v: number) => Math.max(0, Math.min(1, v))
    const aplicar = (delta: number) => {
      alvo.current = clamp(alvo.current + delta)
      if (alvo.current >= 1) liberarScroll()
      else pararScroll()
    }
    const deveCapturar = (delta: number) => {
      if (!ativo()) return false
      if (delta > 0 && alvo.current >= 1) return false
      if (delta < 0 && alvo.current <= 0) return false
      return true
    }

    if (window.scrollY <= 2) pararScroll()

    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY
      if (!deveCapturar(dy)) return
      e.preventDefault()
      aplicar(dy * SENSIBILIDADE)
    }

    let toqueY = 0
    const onTouchStart = (e: TouchEvent) => {
      toqueY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY
      const dy = toqueY - y
      toqueY = y
      if (!deveCapturar(dy)) return
      e.preventDefault()
      aplicar(dy * SENSIBILIDADE * 2.4)
    }

    const onKey = (e: KeyboardEvent) => {
      const alvoEl = e.target as HTMLElement
      if (alvoEl.closest("input, textarea, [contenteditable]")) return
      let d = 0
      if (["ArrowDown", "PageDown", " "].includes(e.key)) d = 0.1
      if (["ArrowUp", "PageUp"].includes(e.key)) d = -0.1
      if (!d || !deveCapturar(d)) return
      e.preventDefault()
      aplicar(d)
    }

    // ao voltar ao topo, reativa a trava
    const onScroll = () => {
      if (window.scrollY <= 2 && alvo.current >= 1) {
        alvo.current = 0.9999
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("keydown", onKey)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("scroll", onScroll)
      liberarScroll()
    }
  }, [reduzido])

  // render loop do canvas
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    let raf = 0
    let ultimo = -1

    const ajustar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ultimo = -1
    }
    ajustar()
    window.addEventListener("resize", ajustar)

    const loop = (t: number) => {
      atual.current += (alvo.current - atual.current) * LERP
      if (Math.abs(alvo.current - atual.current) < 0.0005) atual.current = alvo.current
      const p = atual.current

      const lista = frames.current
      if (temFrames && lista.length) {
        // frame exato ou, enquanto ele não chegou, o carregado mais próximo
        const alvoIdx = Math.round(p * (lista.length - 1))
        let idx = -1
        for (let d = 0; d < lista.length; d++) {
          const a = lista[alvoIdx - d]
          if (a?.complete && a.naturalWidth) { idx = alvoIdx - d; break }
          const b = lista[alvoIdx + d]
          if (b?.complete && b.naturalWidth) { idx = alvoIdx + d; break }
        }
        if (idx >= 0 && idx !== ultimo) {
          desenharCover(ctx, lista[idx], canvas.width, canvas.height)
          ultimo = idx
        }
      } else {
        desenharPlaceholder(ctx, canvas.width, canvas.height, p, t)
      }

      setProgresso((anterior) => (Math.abs(anterior - p) > 0.002 || (p === 1 && anterior !== 1) ? p : anterior))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", ajustar)
    }
  }, [temFrames])

  const i = faseAtual(progresso)
  const fase = fases[i]

  const pular = () => {
    alvo.current = 1
    liberarScroll()
    requestAnimationFrame(() => rolarPara("#dentadura"))
  }

  return (
    <section id="inicio" aria-label="Apresentação" className="relative h-svh min-h-[560px] overflow-hidden bg-ameixa text-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      {/* véu para legibilidade do texto */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(34_18_46/0.82)_0%,rgb(34_18_46/0.35)_55%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgb(34_18_46/0.85),transparent)]" />

      <div className="wrap relative flex h-full flex-col justify-end pb-28 md:justify-center md:pb-0">
        <div className="max-w-[min(100%,52rem)]">
          <AnimatePresence mode="wait">
            <motion.div key={i} exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}>
              <h1 className="titulo-xl" aria-live="polite">
                <TituloMascara texto={fase.titulo} />
              </h1>
              {fase.sub && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="mt-5 max-w-xl text-lg text-white/80 md:text-xl"
                >
                  {fase.sub}
                </motion.p>
              )}
              {fase.cta && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <BotaoWhatsApp tamanho="lg" />
                  <button
                    type="button"
                    onClick={() => {
                      liberarScroll()
                      rolarPara("#protocolo")
                    }}
                    className="rounded-full px-6 py-4 text-base font-medium text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
                  >
                    Ver como funciona
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* arco de progresso */}
      <div className="absolute top-32 right-4 flex w-24 flex-col items-center gap-1 md:top-auto md:right-10 md:bottom-10 md:w-56">
        <Arco progresso={progresso} tom="escuro" className="w-full" />
        <p className="text-xs text-white/70 md:text-sm">{fase.marcador}</p>
      </div>

      {/* dica de rolagem + pular */}
      <AnimatePresence>
        {progresso < 0.02 && !reduzido && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-sm text-white/70 md:block"
          >
            Role para começar
          </motion.p>
        )}
      </AnimatePresence>
      {progresso < 1 && !reduzido && (
        <button
          type="button"
          onClick={pular}
          className="absolute top-20 right-4 rounded-full border border-white/25 px-4 py-2 text-sm text-white/80 transition hover:border-white/60 hover:text-white md:top-24 md:right-10"
        >
          Pular introdução
        </button>
      )}
    </section>
  )
}

function TituloMascara({ texto }: { texto: string }) {
  const palavras = texto.split(" ")
  return (
    <span className="block">
      {palavras.map((p, k) => (
        <span key={k} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: k * 0.06, ease: [0.76, 0, 0.24, 1] }}
          >
            {p}
            {k < palavras.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function desenharCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const r = Math.max(w / img.naturalWidth, h / img.naturalHeight)
  const iw = img.naturalWidth * r
  const ih = img.naturalHeight * r
  ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih)
}

/** Placeholder do VID-01: luz violeta varrendo a cena conforme o progresso. */
function desenharPlaceholder(ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) {
  ctx.fillStyle = "#22122e"
  ctx.fillRect(0, 0, w, h)

  const cx = w * (0.35 + p * 0.4)
  const cy = h * (0.45 - Math.sin(p * Math.PI) * 0.1)
  const r = Math.max(w, h) * (0.35 + p * 0.35)
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0, `rgba(107, 63, 163, ${0.55 + p * 0.25})`)
  g.addColorStop(0.45, "rgba(74, 36, 120, 0.35)")
  g.addColorStop(1, "rgba(34, 18, 46, 0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)

  // brilho rosa sutil pulsando
  const pulso = 0.5 + Math.sin(t / 1400) * 0.5
  const g2 = ctx.createRadialGradient(w * 0.78, h * 0.3, 0, w * 0.78, h * 0.3, Math.max(w, h) * 0.3)
  g2.addColorStop(0, `rgba(196, 123, 174, ${0.08 + pulso * 0.06 + p * 0.1})`)
  g2.addColorStop(1, "rgba(196, 123, 174, 0)")
  ctx.fillStyle = g2
  ctx.fillRect(0, 0, w, h)

  const dpr = w / ctx.canvas.clientWidth || 1
  ctx.font = `${12 * dpr}px "Onest Variable", sans-serif`
  ctx.fillStyle = "rgba(255,255,255,0.45)"
  ctx.textAlign = "left"
  ctx.fillText("VID-01 · IA · aguardando video.mp4 (ver videos.md)", 16 * dpr, 84 * dpr)
}
