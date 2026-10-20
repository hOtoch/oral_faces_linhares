import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Titulo } from "@/components/Titulo"

const REABILITACAO = [
  {
    nome: "Prótese protocolo",
    texto: "Um arco inteiro de dentes fixos sobre implantes, para quem usa dentadura ou perdeu muitos dentes.",
  },
  {
    nome: "Implante unitário",
    texto: "Repõe um dente perdido com uma coroa sobre implante, devolvendo estética, função e segurança.",
  },
  {
    nome: "Implante zigomático",
    texto: "Alternativa para quem não tem osso suficiente no maxilar: o implante se apoia no osso da face.",
  },
  {
    nome: "Próteses",
    texto: "Próteses fixas e removíveis, planejadas para o conforto e a mastigação de cada paciente.",
  },
]

const GRUPOS = [
  {
    nome: "Estética do sorriso",
    itens: [
      ["Facetas em resina", "Corrigem forma, cor e pequenos desgastes dos dentes."],
      ["Lentes de contato dental", "Lâminas finas que mudam cor e formato com pouco desgaste."],
      ["Clareamento", "Personalizado e acompanhado pela dentista, sem receitas caseiras que desgastam o esmalte."],
      ["Harmonização orofacial", "Procedimentos para equilibrar o sorriso e o rosto."],
    ],
  },
  {
    nome: "Clínica geral e família",
    itens: [
      ["Clínico geral", "Consultas, limpeza, restaurações e prevenção."],
      ["Tratamento de canal", "Endodontia para salvar o dente e acabar com a dor."],
      ["Ortodontia", "Aparelhos para alinhar os dentes e a mordida."],
      ["Odontopediatria", "Atendimento para crianças, com paciência e cuidado."],
    ],
  },
]

export function Tratamentos() {
  return (
    <section id="tratamentos" className="bg-esmalte py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-6 md:grid-cols-12">
          <Titulo className="md:col-span-7">Tratamentos para cada fase do sorriso.</Titulo>
          <p className="text-nevoa md:col-span-4 md:col-start-9 md:self-end">
            O foco da clínica é devolver dentes fixos. Para o resto da família, a Oral Face cuida do dia a dia também.
          </p>
        </div>

        <ul className="mt-16 border-t border-cimento md:mt-20">
          {REABILITACAO.map((t) => (
            <li key={t.nome} className="group grid gap-3 border-b border-cimento py-8 md:grid-cols-12 md:items-baseline md:py-10">
              <h3 className="titulo-md text-violeta transition-transform duration-500 ease-[var(--ease-arco)] md:col-span-6 md:group-hover:translate-x-3">{t.nome}</h3>
              <p className="max-w-lg text-lg text-tinta/80 md:col-span-5 md:col-start-8">{t.texto}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
          {GRUPOS.map((g) => (
            <div key={g.nome}>
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{g.nome}</h3>
              <Accordion type="single" collapsible className="mt-4">
                {g.itens.map(([nome, texto]) => (
                  <AccordionItem key={nome} value={nome} className="border-b border-cimento">
                    <AccordionTrigger className="py-5 text-lg font-medium hover:no-underline">{nome}</AccordionTrigger>
                    <AccordionContent className="pb-5 text-base text-nevoa">{texto}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
