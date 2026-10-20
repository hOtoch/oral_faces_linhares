import { Media } from "@/components/Media"
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp"
import { ENDERECO, HORARIOS, MAPS_EMBED_URL, MAPS_URL, WHATSAPP_EXIBICAO, WHATSAPP_URL } from "@/lib/contato"

export function Contato() {
  return (
    <section id="contato" className="relative overflow-hidden bg-ameixa text-white">
      <div className="absolute inset-0" aria-hidden>
        <Media id="VID-02" fill tom="escuro" fundo className="opacity-45" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(34_18_46/0.35),rgb(34_18_46/0.92))]" aria-hidden />

      <div className="wrap relative py-28 md:py-40">
        <h2 className="titulo-xl max-w-5xl">Seu sorriso fixo começa com uma conversa.</h2>
        <p className="mt-6 max-w-xl text-xl text-white/75">Agende sua avaliação pelo WhatsApp. A equipe responde e encontra o melhor horário para você.</p>
        <div className="mt-10">
          <BotaoWhatsApp tamanho="lg" />
        </div>

        <div className="mt-24 grid gap-12 border-t border-white/15 pt-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">Endereço</h3>
            <address className="mt-4 text-lg not-italic text-white/80">
              {ENDERECO.linha1}
              <br />
              {ENDERECO.linha2}
              <br />
              {ENDERECO.referencia}
            </address>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block underline decoration-white/40 underline-offset-4 hover:decoration-white">
              Abrir no Google Maps
            </a>
            <h3 className="mt-10 font-display text-xl font-semibold tracking-[-0.02em]">WhatsApp</h3>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-lg text-white/80 hover:text-white">
              {WHATSAPP_EXIBICAO}
            </a>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">Horários</h3>
            <dl className="mt-4 space-y-2 text-lg">
              {HORARIOS.map((h) => (
                <div key={h.dia} className="flex justify-between gap-6 border-b border-white/10 pb-2">
                  <dt className="text-white/70">{h.dia}</dt>
                  <dd>{h.hora}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="min-h-72 overflow-hidden rounded-[28px] md:col-span-5">
            <iframe
              title="Mapa da Oral Face Linhares"
              src={MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-72 w-full border-0 grayscale-[0.4]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
