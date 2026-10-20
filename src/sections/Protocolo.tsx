import { useRef, useState } from "react"
import { useMotionValueEvent, useScroll } from "motion/react"
import { Arco, type EstadoArco } from "@/components/Arco"
import { Titulo } from "@/components/Titulo"
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp"
import { cn } from "@/lib/utils"

// ⚠️ Etapas gerais do protocolo; confirmar com a clínica (informacoes.md, pendência 10).
const PASSOS: { titulo: string; texto: string; estado: EstadoArco }[] = [
  {
    titulo: "Avaliação",
    texto: "Conversa, exame clínico e exames de imagem para entender o seu caso e o que você espera do tratamento.",
    estado: "contorno",
  },
  {
    titulo: "Planejamento",
    texto: "O plano é feito para a sua boca: quantos implantes, que tipo de prótese e quais etapas.",
    estado: "plano",
  },
  {
    titulo: "Instalação dos implantes",
    texto: "Os implantes são instalados com anestesia local. Eles fazem o papel da raiz dos dentes.",
    estado: "implantes",
  },
  {
    titulo: "Dentes fixos provisórios",
    texto: "Quando a carga imediata é indicada, a prótese provisória fixa é instalada em cerca de 24 horas.",
    estado: "provisorio",
  },
  {
    titulo: "Prótese definitiva",
    texto: "Depois da cicatrização, a prótese definitiva é feita sob medida para o seu sorriso.",
    estado: "definitivo",
  },
]

/** Como funciona o protocolo: passos à esquerda, arco fixo à direita (sticky). */
export function Protocolo() {
  const ref = useRef<HTMLDivElement>(null)
  const [ativo, setAtivo] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setAtivo(Math.min(PASSOS.length - 1, Math.max(0, Math.floor(v * PASSOS.length))))
  })

  return (
    <section id="protocolo" className="relative bg-ameixa py-24 text-white md:py-36">
      <div className="wrap">
        <div className="max-w-3xl">
          <Titulo className="text-white">Como funciona a prótese protocolo.</Titulo>
          <p className="mt-6 max-w-[36rem] text-lg text-white/70">
            O protocolo devolve um arco inteiro de dentes fixos, apoiado em implantes. São cinco etapas.
          </p>
        </div>

        <div ref={ref} className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
          <ol className="md:col-span-6">
            {PASSOS.map((p, i) => (
              <li
                key={p.titulo}
                className={cn(
                  "flex gap-6 border-t border-white/10 py-10 transition-opacity duration-500 md:min-h-[42vh] md:py-14",
                  i === ativo ? "opacity-100" : "md:opacity-70"
                )}
              >
                <span className={cn("font-display text-3xl font-semibold tabular-nums transition-colors md:text-4xl", i <= ativo ? "text-petala" : "text-white/30")}>
                  {i + 1}
                </span>
                <div>
                  <h3 className="titulo-md">{p.titulo}</h3>
                  <p className="mt-4 max-w-md text-lg text-white/75">{p.texto}</p>
                  <div className="mt-8 w-48 md:hidden">
                    <Arco estado={p.estado} tom="escuro" />
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="hidden md:col-span-6 md:block">
            <div className="sticky top-[18vh] flex flex-col items-center">
              <Arco estado={PASSOS[ativo].estado} tom="escuro" className="w-full max-w-[460px]" titulo={`Ilustração da etapa ${ativo + 1}: ${PASSOS[ativo].titulo}`} />
              <p className="mt-6 text-white/60">
                Etapa {ativo + 1} de {PASSOS.length}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 border-t border-white/10 pt-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-white/70">Prazos e etapas variam conforme cada caso e são definidos na avaliação.</p>
          <BotaoWhatsApp />
        </div>
      </div>
    </section>
  )
}
