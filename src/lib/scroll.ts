import Lenis from "lenis"

let lenis: Lenis | null = null

export function iniciarLenis() {
  if (lenis || typeof window === "undefined") return lenis
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  const raf = (t: number) => {
    lenis?.raf(t)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  return lenis
}

export function pararScroll() {
  lenis?.stop()
  document.documentElement.style.overflow = "hidden"
}

export function liberarScroll() {
  lenis?.start()
  document.documentElement.style.overflow = ""
}

export function rolarPara(alvo: string | number) {
  if (lenis) lenis.scrollTo(alvo, { offset: -72 })
  else if (typeof alvo === "string") document.querySelector(alvo)?.scrollIntoView({ behavior: "smooth" })
  else window.scrollTo({ top: alvo, behavior: "smooth" })
}
