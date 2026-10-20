const ITENS = [
  "Prótese protocolo",
  "Implantes",
  "Implante zigomático",
  "Próteses",
  "Facetas em resina",
  "Lentes de contato dental",
  "Clareamento",
  "Ortodontia",
  "Harmonização orofacial",
]

/** Faixa lenta com os tratamentos (uma faixa só; pausa no hover). */
export function Faixa() {
  const linha = (oculta: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={oculta || undefined}>
      {ITENS.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="font-display text-xl font-medium tracking-[-0.02em] md:text-2xl">{item}</span>
          <svg viewBox="0 0 20 24" className="mx-8 h-5 w-4 text-petala" fill="currentColor" aria-hidden>
            <rect x="2" y="2" width="16" height="20" rx="7" />
          </svg>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee overflow-hidden border-y border-white/10 bg-violeta py-5 text-white" role="region" aria-label="Tratamentos oferecidos">
      <div className="marquee-track flex w-max">
        {linha(false)}
        {linha(true)}
      </div>
    </div>
  )
}
