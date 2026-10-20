import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Switch } from "@/components/ui/switch"
import { Media } from "@/components/Media"
import { Titulo } from "@/components/Titulo"
import { cn } from "@/lib/utils"

const DENTADURA = [
  "Pode soltar ao falar, rir ou espirrar.",
  "Com o tempo, o osso da gengiva diminui e o contorno da boca muda.",
  "Cobre o céu da boca e pode atrapalhar o sabor dos alimentos.",
  "Precisa sair da boca para limpar e para dormir.",
]

const FIXA = [
  "Fica presa aos implantes: você não tira em casa.",
  "Mais firmeza para mastigar, falar e sorrir.",
  "Os implantes ajudam a preservar o osso e o contorno do rosto.",
  "Deixa o céu da boca livre para sentir o sabor da comida.",
]

/** Dentadura × prótese fixa: conteúdo do post "3 verdades sobre a dentadura". */
export function Dentadura() {
  const [fixa, setFixa] = useState(false)
  const lista = fixa ? FIXA : DENTADURA

  return (
    <section id="dentadura" className="bg-esmalte py-24 md:py-36">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <Titulo>A diferença que você sente ao sorrir.</Titulo>
          <p className="mt-6 max-w-[34rem] text-nevoa">
            Quem usa dentadura conhece a insegurança. A prótese fixa sobre implantes muda o dia a dia. Veja lado a lado.
          </p>

          <div className="mt-10 flex w-full items-center justify-between gap-2 rounded-full bg-white p-1.5 shadow-[0_1px_0_var(--cimento)] sm:inline-flex sm:w-auto sm:gap-4 sm:p-2 sm:pr-5">
            <button type="button" className={cn("cursor-pointer rounded-full px-4 py-2.5 text-base font-medium whitespace-nowrap transition sm:text-lg", !fixa ? "bg-ameixa text-white" : "text-nevoa")} onClick={() => setFixa(false)}>
              Com dentadura
            </button>
            <Switch
              id="comparar"
              checked={fixa}
              onCheckedChange={setFixa}
              aria-label="Mostrar prótese fixa sobre implantes"
              className="hidden! h-8! w-14! sm:inline-flex! data-checked:bg-violeta data-unchecked:bg-nevoa/40 [&_[data-slot=switch-thumb]]:size-7! [&_[data-slot=switch-thumb]]:data-checked:translate-x-6!"
            />
            <button type="button" className={cn("cursor-pointer rounded-full px-4 py-2.5 text-base font-medium whitespace-nowrap transition sm:text-lg", fixa ? "bg-violeta text-white" : "text-nevoa")} onClick={() => setFixa(true)}>
              Com prótese fixa
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={fixa ? "fixa" : "dentadura"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-10 space-y-5"
              aria-live="polite"
            >
              {lista.map((item) => (
                <li key={item} className="flex gap-4 text-lg md:text-xl">
                  <span
                    aria-hidden
                    className={cn("mt-[0.7em] inline-block shrink-0", fixa ? "h-4 w-3 -translate-y-1 rounded-[6px] bg-violeta" : "h-0.5 w-3 bg-nevoa/60")}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>

          <p className="mt-10 text-base text-nevoa">A indicação depende de cada caso e é feita na avaliação.</p>
        </div>

        <div className="relative md:col-span-6 md:col-start-7">
          <div className="sticky top-28 overflow-hidden rounded-[28px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={fixa ? "img-fixa" : "img-dentadura"}
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              >
                <Media id={fixa ? "IMG-02" : "IMG-01"} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
