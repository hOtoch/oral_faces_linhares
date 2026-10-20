import { useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
  tom?: "claro" | "escuro" // fundo em que a logo aparece: claro → violeta, escuro → branca
  variante?: "horizontal" | "empilhada"
  className?: string
}

/**
 * IMG-08 (classe CLIENTE). Provisório: recorte da logo do Instagram (320px) em
 * public/images/logo-{tom}.webp e logo-h-{tom}.webp, até a clínica mandar o vetor.
 * As duas versões de cor ficam sobrepostas e trocam com fade, sem recarregar.
 * Se os arquivos sumirem, mostra o nome tipografado.
 */
export function Logo({ tom = "escuro", variante = "horizontal", className }: Props) {
  const [semArquivo, setSemArquivo] = useState(false)
  const sufixo = variante === "horizontal" ? "logo-h" : "logo"

  if (!semArquivo) {
    return (
      <span className={cn("relative inline-grid", variante === "empilhada" && "w-56 md:w-72", className)}>
        {(["escuro", "claro"] as const).map((t) => (
          <img
            key={t}
            src={`/images/${sufixo}-${t}.webp`}
            alt={t === tom ? "Oral Face Clínica odontológica" : ""}
            aria-hidden={t !== tom || undefined}
            className={cn(
              "col-start-1 row-start-1 block transition-opacity duration-300",
              variante === "horizontal" ? "h-9 w-auto max-w-none md:h-11" : "h-auto w-full",
              t === tom ? "opacity-100" : "opacity-0"
            )}
            decoding="async"
            onError={() => setSemArquivo(true)}
          />
        ))}
      </span>
    )
  }

  return (
    <span className={cn("flex flex-col leading-none", className)} data-media-placeholder="IMG-08">
      <span className={cn("font-display text-[1.35rem] font-semibold tracking-[-0.02em] md:text-[1.55rem]", tom === "claro" ? "text-violeta" : "text-white")}>
        Oral Face
      </span>
      <span className={cn("mt-1 text-[0.72rem] tracking-[0.02em]", tom === "claro" ? "text-nevoa" : "text-white/70")}>
        Clínica odontológica
      </span>
    </span>
  )
}
