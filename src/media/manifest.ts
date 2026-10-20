// Catálogo único de mídias. Cada ID tem uma entrada em videos.md ou imagens.md.
// Quando o arquivo existir em public/ com o caminho de `src`, ele substitui o placeholder sozinho.

export type Classe = "IA" | "FOTO REAL" | "VÍDEO REAL" | "CLIENTE"

export type Midia = {
  id: string
  tipo: "imagem" | "video"
  classe: Classe
  src: string
  ratio: string // CSS aspect-ratio, ex.: "4 / 5"
  alt: string
  secao: string
  poster?: string
  provisoria?: boolean // true = arquivo atual veio da pesquisa (Maps/Instagram) e deve ser trocado
}

export const midias = {
  "VID-01": {
    id: "VID-01",
    tipo: "video",
    classe: "IA",
    src: "/videos/hero.mp4",
    poster: "/videos/hero_poster.webp",
    ratio: "16 / 9",
    alt: "Modelo de prótese fixa sobre implantes iluminado em violeta",
    secao: "Hero",
  },
  "VID-02": {
    id: "VID-02",
    tipo: "video",
    classe: "IA",
    src: "/videos/cta-loop.mp4",
    poster: "/videos/cta-loop_poster.webp",
    ratio: "16 / 9",
    alt: "",
    secao: "CTA final",
  },
  "IMG-01": {
    id: "IMG-01",
    tipo: "imagem",
    classe: "IA",
    src: "/images/dentadura.webp",
    ratio: "4 / 3",
    alt: "Dentadura removível sobre uma superfície clara",
    secao: "Dentadura × prótese fixa",
  },
  "IMG-02": {
    id: "IMG-02",
    tipo: "imagem",
    classe: "IA",
    src: "/images/protese-fixa.webp",
    ratio: "4 / 3",
    alt: "Modelo de prótese fixa sobre implantes",
    secao: "Dentadura × prótese fixa",
  },
  "IMG-03": {
    id: "IMG-03",
    tipo: "imagem",
    classe: "FOTO REAL",
    src: "/images/fachada.webp",
    ratio: "3 / 4",
    alt: "Fachada roxa da Oral Face na Av. João Felipe Calmon, no Centro de Linhares",
    secao: "A clínica",
    provisoria: true,
  },
  "IMG-04": {
    id: "IMG-04",
    tipo: "imagem",
    classe: "FOTO REAL",
    src: "/images/recepcao.webp",
    ratio: "3 / 4",
    alt: "Recepção da Oral Face com a logo na parede de cimento queimado",
    secao: "A clínica",
    provisoria: true,
  },
  "IMG-05": {
    id: "IMG-05",
    tipo: "imagem",
    classe: "FOTO REAL",
    src: "/images/consultorio.webp",
    ratio: "4 / 3",
    alt: "Consultório da Oral Face",
    secao: "A clínica",
  },
  "IMG-06": {
    id: "IMG-06",
    tipo: "imagem",
    classe: "FOTO REAL",
    src: "/images/dra-laysa.webp",
    ratio: "4 / 5",
    alt: "Dra. Laysa Rossoni Bergamaschi",
    secao: "Equipe",
  },
  "IMG-07": {
    id: "IMG-07",
    tipo: "imagem",
    classe: "FOTO REAL",
    src: "/images/dra-kristiane.webp",
    ratio: "4 / 5",
    alt: "Dra. Kristiane Laís Barcellos",
    secao: "Equipe",
  },
  "IMG-08": {
    id: "IMG-08",
    tipo: "imagem",
    classe: "CLIENTE",
    src: "/images/logo-h-escuro.webp",
    ratio: "558 / 120",
    alt: "Oral Face Clínica odontológica",
    secao: "Header e preloader",
    provisoria: true,
  },
} satisfies Record<string, Midia>

export type MidiaId = keyof typeof midias
