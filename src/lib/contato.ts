// Dados de contato e legais. Fonte: informacoes.md (pendências marcadas com ⚠️ lá).
export const WHATSAPP_NUMERO = "5527995152111"
export const WHATSAPP_EXIBICAO = "(27) 99515-2111"
export const WHATSAPP_MENSAGEM = "Olá! Vim pelo site e gostaria de agendar uma avaliação."
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`

export const INSTAGRAM_URL = "https://www.instagram.com/oralfacelinhares/"
export const MAPS_URL =
  "https://www.google.com/maps/place/Oral+Face+Linhares+-+Cl%C3%ADnica+Odontol%C3%B3gica/@-19.4027619,-40.0674283,17z"
export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Oral+Face+Linhares+-+Cl%C3%ADnica+Odontol%C3%B3gica,+Av.+Jo%C3%A3o+Felipe+Calmon,+636,+Linhares+-+ES&hl=pt-BR&output=embed"

export const ENDERECO = {
  linha1: "Av. João Felipe Calmon, 636",
  linha2: "Centro, Linhares/ES · 29900-022",
  referencia: "Perto da Praça dos Correios",
}

export const HORARIOS = [
  { dia: "Segunda", hora: "8h às 18h" },
  { dia: "Terça", hora: "8h às 19h" },
  { dia: "Quarta a sexta", hora: "8h às 18h" },
  { dia: "Sábado", hora: "8h às 12h" },
  { dia: "Domingo", hora: "Fechado" },
]

// ⚠️ EPAO divergente: 2122 (Instagram) × 2221 (fachada). Placeholder visível até a clínica confirmar.
export const EPAO = "EPAO-ES [confirmar nº]"
export const RESPONSAVEL_TECNICA = { nome: "Dra. Laysa Rossoni Bergamaschi", cro: "CRO-ES 8869" }
