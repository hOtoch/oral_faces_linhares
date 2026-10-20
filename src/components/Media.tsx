import { useState } from "react"
import { cn } from "@/lib/utils"
import { midias, type MidiaId } from "@/media/manifest"

type Props = {
  id: MidiaId
  className?: string
  /** Ignora o aspect-ratio do manifesto (quando o pai define o tamanho). */
  fill?: boolean
  /** Vídeos: autoplay em loop, mudo. */
  loop?: boolean
  tom?: "claro" | "escuro"
  priority?: boolean
  /** Usado como fundo: placeholder sem marca d'água, rótulo no topo. */
  fundo?: boolean
}

/**
 * Tenta carregar a mídia real (`src` do manifesto). Se o arquivo não existir,
 * mostra um placeholder com o ID, o caminho esperado e a proporção.
 */
export function Media({ id, className, fill, loop = true, tom = "claro", priority, fundo }: Props) {
  const m = midias[id]
  const [faltando, setFaltando] = useState(false)
  const style = fill ? undefined : { aspectRatio: m.ratio }

  if (faltando) return <Placeholder id={id} style={style} tom={tom} fundo={fundo} />

  if (m.tipo === "video") {
    return (
      <video
        className={cn("block h-full w-full object-cover", className)}
        style={style}
        src={m.src}
        poster={"poster" in m ? m.poster : undefined}
        autoPlay={loop}
        loop={loop}
        muted
        playsInline
        preload={priority ? "auto" : "none"}
        aria-hidden={m.alt ? undefined : true}
        onError={() => setFaltando(true)}
      />
    )
  }

  return (
    <img
      className={cn("block h-full w-full object-cover", className)}
      style={style}
      src={m.src}
      alt={m.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFaltando(true)}
    />
  )
}

export function Placeholder({
  id,
  className,
  style,
  tom = "claro",
  fundo,
}: {
  id: MidiaId
  className?: string
  style?: React.CSSProperties
  tom?: "claro" | "escuro"
  fundo?: boolean
}) {
  const m = midias[id]
  const escuro = tom === "escuro"
  return (
    <div
      role="img"
      aria-label={m.alt || `Mídia ${m.id} pendente`}
      data-media-placeholder={m.id}
      className={cn(
        "placeholder-shimmer relative isolate flex h-full w-full overflow-hidden",
        escuro
          ? "bg-[radial-gradient(120%_90%_at_20%_10%,var(--violeta)_0%,var(--ameixa-2)_55%,var(--ameixa)_100%)] text-nevoa-escuro"
          : "bg-[radial-gradient(120%_90%_at_20%_10%,#efe9f5_0%,var(--lilas-claro)_55%,#d8cde4_100%)] text-nevoa",
        className
      )}
      style={style}
    >
      {!fundo && <ArcoMarca className={cn("absolute top-1/2 left-1/2 w-2/5 max-w-56 -translate-x-1/2 -translate-y-1/2", escuro ? "text-white/10" : "text-violeta/12")} />}
      <div className={cn("absolute inset-x-3 flex", fundo ? "top-24 z-10" : "bottom-3")}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] leading-tight">
        <span className={cn("rounded-full px-2 py-0.5 font-semibold", escuro ? "bg-white/10 text-white" : "bg-white/70 text-violeta")}>
          {m.id} · {m.classe}
        </span>
        <span className="opacity-80">
          public{m.src} · {m.ratio.replace(/ /g, "")}
        </span>
      </div>
      </div>
    </div>
  )
}

/** Arco de 12 dentes simplificado, usado como marca d'água dos placeholders. */
function ArcoMarca({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="currentColor" aria-hidden>
      {Array.from({ length: 12 }, (_, i) => {
        const a = Math.PI + (Math.PI * (i + 0.5)) / 12
        const x = 100 + Math.cos(a) * 80
        const y = 105 + Math.sin(a) * 80
        const rot = (a * 180) / Math.PI + 90
        return <rect key={i} x={x - 7} y={y - 10} width={14} height={20} rx={6} transform={`rotate(${rot} ${x} ${y})`} />
      })}
    </svg>
  )
}
