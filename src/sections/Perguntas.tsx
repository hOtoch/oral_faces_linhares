import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Titulo } from "@/components/Titulo"
import { WHATSAPP_EXIBICAO } from "@/lib/contato"

const PERGUNTAS = [
  {
    p: "Quem usa dentadura pode fazer prótese protocolo?",
    r: "Em muitos casos, sim. Só a avaliação mostra se o seu caso é indicado e qual é o melhor caminho.",
  },
  {
    p: "Fico sem dentes durante o tratamento?",
    r: "Quando a carga imediata é indicada, você recebe dentes fixos provisórios em cerca de 24 horas. Nos outros casos, a equipe explica as alternativas na avaliação.",
  },
  {
    p: "E se eu não tiver osso suficiente?",
    r: "Existem alternativas, como o implante zigomático, que se apoia no osso da face. A indicação é feita depois dos exames.",
  },
  {
    p: "Como é a cirurgia?",
    r: "Os implantes são instalados com anestesia local. A equipe orienta você sobre todos os cuidados antes e depois.",
  },
  {
    p: "A clínica atende crianças e a família toda?",
    r: "Sim. Além de implantes e próteses, a Oral Face tem clínico geral, tratamento de canal, ortodontia e odontopediatria.",
  },
  {
    p: "Como faço para agendar?",
    r: `Pelo WhatsApp ${WHATSAPP_EXIBICAO}. Atendemos de segunda a sexta das 8h às 18h (terça até 19h) e aos sábados das 8h às 12h.`,
  },
]

export function Perguntas() {
  return (
    <section id="perguntas" className="bg-white py-24 md:py-36">
      <div className="wrap grid gap-12 md:grid-cols-12">
        <Titulo className="md:col-span-4">Perguntas frequentes.</Titulo>
        <Accordion type="single" collapsible className="border-t border-cimento md:col-span-7 md:col-start-6">
          {PERGUNTAS.map(({ p, r }) => (
            <AccordionItem key={p} value={p} className="border-b border-cimento">
              <AccordionTrigger className="py-6 text-lg font-medium hover:no-underline md:text-xl">{p}</AccordionTrigger>
              <AccordionContent className="max-w-2xl pb-6 text-lg text-tinta/75">{r}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
