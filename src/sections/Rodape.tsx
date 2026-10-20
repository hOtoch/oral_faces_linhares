const ANO = new Date().getFullYear()

import { EPAO, ENDERECO, INSTAGRAM_URL, RESPONSAVEL_TECNICA, WHATSAPP_URL } from "@/lib/contato"

export function Rodape() {
  return (
    <footer className="relative overflow-hidden bg-esmalte pt-20 pb-28 md:pb-0">
      <div className="wrap grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-xl font-semibold tracking-[-0.02em] text-violeta">Oral Face Linhares</p>
          <p className="mt-2 text-nevoa">Clínica odontológica · {EPAO}</p>
          <p className="mt-1 text-nevoa">
            Responsável técnica: {RESPONSAVEL_TECNICA.nome} · {RESPONSAVEL_TECNICA.cro}
          </p>
        </div>
        <div className="text-nevoa md:col-span-3">
          <p>{ENDERECO.linha1}</p>
          <p>{ENDERECO.linha2}</p>
        </div>
        <ul className="space-y-2 md:col-span-3 md:col-start-10">
          <li>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-violeta">
              WhatsApp
            </a>
          </li>
          <li>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-violeta">
              Instagram @oralfacelinhares
            </a>
          </li>
        </ul>
      </div>
      <p className="wrap mt-12 text-sm text-nevoa">© {ANO} Oral Face Linhares. Todos os direitos reservados.</p>

      <p
        aria-hidden
        className="pointer-events-none mt-10 -mb-[0.22em] text-center font-display text-[17vw] leading-[0.8] font-semibold tracking-[-0.06em] whitespace-nowrap text-violeta select-none"
      >
        Oral Face
      </p>
    </footer>
  )
}
