// Fases da hero (VID-01). Provisórias: 25% cada até o video.mp4 existir.
// Depois de rodar scripts/process-media.sh, ajuste os limites conforme o HERO_TIMELINE.md.

export type Fase = {
  inicio: number // 0 → 1
  fim: number
  marcador: string
  titulo: string
  sub?: string
  cta?: boolean
}

export const fases: Fase[] = [
  {
    inicio: 0,
    fim: 0.25,
    marcador: "Implantes",
    titulo: "Dentes fixos de novo.",
    sub: "Implantes e prótese protocolo no Centro de Linhares.",
  },
  {
    inicio: 0.25,
    fim: 0.5,
    marcador: "Firmeza",
    titulo: "Chega de dentadura que solta.",
    sub: "Mais firmeza para mastigar, falar e sorrir.",
  },
  {
    inicio: 0.5,
    fim: 0.75,
    marcador: "Planejamento",
    titulo: "Planejado para o seu caso.",
    sub: "Todo tratamento começa com uma avaliação individual.",
  },
  {
    inicio: 0.75,
    fim: 1.0001,
    marcador: "Seu sorriso",
    titulo: "Oral Face Linhares",
    sub: "Mais de 2.500 sorrisos transformados, nota 5,0 no Google.",
    cta: true,
  },
]

export function faseAtual(p: number) {
  return Math.max(
    0,
    fases.findIndex((f) => p >= f.inicio && p < f.fim)
  )
}
