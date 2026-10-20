import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp"
import { Logo } from "@/components/Logo"
import { liberarScroll, rolarPara } from "@/lib/scroll"

const LINKS = [
  { href: "#protocolo", rotulo: "Como funciona" },
  { href: "#tratamentos", rotulo: "Tratamentos" },
  { href: "#clinica", rotulo: "A clínica" },
  { href: "#contato", rotulo: "Como chegar" },
]

export function Header() {
  const [solido, setSolido] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolido(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,color] duration-300",
        solido ? "bg-esmalte/92 text-tinta shadow-[0_1px_0_var(--cimento)] backdrop-blur-md" : "text-white"
      )}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6 md:h-20">
        <a href="#inicio" aria-label="Oral Face Clínica odontológica, voltar ao início" className="shrink-0">
          <Logo tom={solido ? "claro" : "escuro"} />
        </a>
        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.98rem]">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault()
                    liberarScroll()
                    rolarPara(l.href)
                  }}
                  className="underline-offset-6 opacity-85 transition hover:underline hover:opacity-100"
                >
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <BotaoWhatsApp texto="Agendar" variante={solido ? "claro" : "solido"} className="hidden md:inline-flex" />
      </div>
    </header>
  )
}
