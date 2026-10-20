import { lazy, Suspense, useEffect } from "react"
import { MotionConfig } from "motion/react"
import { Header } from "@/components/Header"
import { BarraMobile } from "@/components/BarraMobile"
import { Preloader } from "@/sections/Preloader"
import { Hero } from "@/sections/Hero"
import { Faixa } from "@/sections/Faixa"
import { Dentadura } from "@/sections/Dentadura"
import { Protocolo } from "@/sections/Protocolo"
import { Clinica } from "@/sections/Clinica"
import { Avaliacoes } from "@/sections/Avaliacoes"
import { Contato } from "@/sections/Contato"
import { Rodape } from "@/sections/Rodape"
import { iniciarLenis } from "@/lib/scroll"

// seções com shadcn/radix (accordion) carregam depois da primeira dobra
const Tratamentos = lazy(() => import("@/sections/Tratamentos").then((m) => ({ default: m.Tratamentos })))
const Perguntas = lazy(() => import("@/sections/Perguntas").then((m) => ({ default: m.Perguntas })))

export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    window.scrollTo(0, 0)
    iniciarLenis()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#dentadura" className="sr-only z-50 rounded bg-white px-4 py-2 text-violeta focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Pular para o conteúdo
      </a>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Faixa />
        <Dentadura />
        <Protocolo />
        <Suspense fallback={<div id="tratamentos" className="min-h-screen bg-esmalte" />}>
          <Tratamentos />
        </Suspense>
        <Clinica />
        <Avaliacoes />
        <Suspense fallback={<div id="perguntas" className="min-h-[60vh] bg-white" />}>
          <Perguntas />
        </Suspense>
        <Contato />
      </main>
      <Rodape />
      <BarraMobile />
    </MotionConfig>
  )
}
