import { Media } from "@/components/Media"
import { Titulo } from "@/components/Titulo"

// ⚠️ Equipe parcial (só quem aparece na placa da fachada). Pedir lista completa à clínica.
const EQUIPE = [
  { foto: "IMG-06" as const, nome: "Dra. Laysa Rossoni Bergamaschi", funcao: "Cirurgiã-dentista · Responsável técnica", cro: "CRO-ES 8869" },
  { foto: "IMG-07" as const, nome: "Dra. Kristiane Laís Barcellos", funcao: "Cirurgiã-dentista", cro: "CRO-ES 9952" },
]

export function Clinica() {
  return (
    <section id="clinica" className="bg-white py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Titulo>Uma clínica pensada para você se sentir em casa.</Titulo>
            <p className="mt-6 max-w-[34rem] text-lg text-tinta/80">
              A Oral Face fica no Centro de Linhares, perto da Praça dos Correios. Foi pensada para oferecer uma experiência acolhedora, moderna
              e eficiente, do jeitinho que você merece.
            </p>
            <ul className="mt-8 space-y-3 text-nevoa">
              <li>Entrada e banheiro acessíveis para cadeira de rodas.</li>
              <li>Atendimento de segunda a sábado.</li>
              <li>Pacientes que trazem a família toda desde a inauguração.</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 md:col-span-7 md:gap-5">
            <div className="overflow-hidden rounded-[28px]">
              <Media id="IMG-03" />
            </div>
            <div className="mt-12 overflow-hidden rounded-[28px] md:mt-24">
              <Media id="IMG-04" />
            </div>
            <div className="col-span-2 overflow-hidden rounded-[28px]">
              <Media id="IMG-05" />
            </div>
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <h3 className="titulo-md">Quem vai cuidar do seu sorriso</h3>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {EQUIPE.map((p) => (
              <figure key={p.nome}>
                <div className="overflow-hidden rounded-[28px]">
                  <Media id={p.foto} />
                </div>
                <figcaption className="mt-5">
                  <p className="font-display text-lg font-semibold tracking-[-0.02em]">{p.nome}</p>
                  <p className="mt-1 text-nevoa">{p.funcao}</p>
                  <p className="text-nevoa">{p.cro}</p>
                </figcaption>
              </figure>
            ))}
            <div className="flex flex-col justify-end rounded-[28px] bg-lilas-claro p-8 sm:col-span-2 lg:col-span-1">
              <p className="font-display text-xl font-semibold tracking-[-0.02em] text-violeta">E uma equipe que recebe você pelo nome.</p>
              <p className="mt-3 text-tinta/75">"Excelente atendimento desde a recepção até aos profissionais dentistas." Avaliação no Google</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
