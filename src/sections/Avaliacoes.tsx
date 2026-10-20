import { Titulo } from "@/components/Titulo"
import { MAPS_URL } from "@/lib/contato"

// Avaliações públicas do Google (primeiro nome + inicial). ⚠️ Confirmar autorização com a clínica.
const DEPOIMENTOS = [
  {
    texto:
      "Excelente atendimento desde a recepção até a consulta. A dentista demonstrou muito profissionalismo, atenção e cuidado durante todo o atendimento, explicando os procedimentos com clareza e transmitindo segurança.",
    nome: "Karlla Z.",
  },
  { texto: "Está sendo maravilhoso. As meninas são umas gracinhas. E vou dar início ao meu implante aqui.", nome: "Stephanie R." },
  {
    texto: "Um maravilhoso atendimento, profissionalismo nota mil! Indico milhões de vezes. Tenho plano em outra clínica, mas só venho aqui.",
    nome: "Paciente da clínica",
  },
  { texto: "Atendimento super bom e excelente o trabalho.", nome: "Gabriel A." },
]

export function Avaliacoes() {
  return (
    <section id="avaliacoes" className="bg-esmalte py-24 md:py-36">
      <div className="wrap grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-[clamp(5rem,14vw,11rem)] leading-none font-semibold tracking-[-0.05em] text-violeta">5,0</p>
          <p className="mt-4 text-xl">
            no Google, com <strong>122 avaliações</strong>.
          </p>
          <p className="mt-2 text-nevoa">E mais de 2.500 sorrisos transformados.</p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block font-medium text-violeta underline decoration-violeta/30 underline-offset-4 hover:decoration-violeta"
          >
            Ler todas as avaliações no Google
          </a>
        </div>

        <div className="md:col-span-7">
          <Titulo className="titulo-md! max-w-xl">O que dizem os pacientes.</Titulo>
          <ul className="mt-10 space-y-10">
            {DEPOIMENTOS.map((d) => (
              <li key={d.nome} className="border-l-2 border-petala pl-6">
                <blockquote className="text-lg leading-relaxed md:text-xl">"{d.texto}"</blockquote>
                <p className="mt-3 text-nevoa">{d.nome}, no Google</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
