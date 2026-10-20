# Pesquisa de componentes — Oral Face Linhares

Fontes consultadas em 19/10/2026: **21st MCP** (busca), **Motion MCP gratuito** (docs/exemplos; nada de Motion+) e **shadcn** (registry oficial). O código pago do 21st não foi baixado: os componentes foram recriados do zero com `motion` + Tailwind, usando os exemplos como referência de comportamento.

| Seção | Componente/animação escolhido | Fonte | Nome/link do exemplo | Adaptação para a identidade Oral Face |
|---|---|---|---|---|
| Hero | Hero pinned com scrub de frames em canvas e scroll travado | 21st | **Scroll-Locked Video Hero** (gughigug) — https://21st.dev/@gughigug/components/scroll-locked-video-hero · alternativas: Hero Scrub (jean.duthil13), Scroll-Triggered Video Hero (daiwiikharihar) | Trava wheel/touch/teclado até o fim do vídeo (o Hero Scrub usa GSAP; dispensado). Progresso desenhado como **arco de 12 dentes** em SVG em vez de barra. Placeholder animado em canvas enquanto `VID-01` não existir |
| Faixa de serviços | Marquee CSS lento, uma faixa | 21st | Testimonials Marquee (shadcnspace) como base de técnica · alternativas: Testimonial Marquee (componentry) | Uma faixa só, velocidade baixa, pausa no hover, sem segunda faixa em contorno (excesso para o público) |
| Dentadura × prótese fixa | Interruptor de dois estados com troca animada de conteúdo | shadcn + Motion | `@shadcn/switch` + Motion **AnimatePresence modes** (motion://examples/react/animate-presence-modes) · alternativas: Compare (aceternity, slider de imagem), Toggle Switch (prebuiltui) | O slider de antes/depois do Compare foi descartado (sugere resultado clínico). Interruptor grande com rótulos "Com dentadura" / "Com prótese fixa"; lista e imagem trocam com `mode="wait"` |
| Como funciona o protocolo | Seção sticky: passos à esquerda, visual fixo à direita | 21st + Motion | **Scroll 01** (felipemenezes098) — sticky media que troca com o texto · alternativas: Scroll animated timeline (ibrandify), Stepper (sean0205) · Motion `useScroll`/`useTransform` (motion://examples/react/text-scroll-word-reveal) | O visual fixo é o **arco de 12 dentes** que muda de estado por passo (contorno → implantes → arco provisório → arco definitivo). Mobile vira lista vertical com o arco pequeno no topo |
| Tratamentos | Lista editorial expansível | 21st + shadcn | **Editorial service list** (ibrandify) · alternativas: Media Accordion (shadcnspace), Proximity Accordion (ppramanik62) · `@shadcn/accordion` | Reabilitação em destaque (4 itens grandes); estética e clínica geral como acordeões menores. Sem numeração (não é sequência) |
| A clínica e a equipe | Grid assimétrico de fotos + fichas das dentistas | — | Sem exemplo bom nas fontes; criado do zero (skill frontend-design) | Fotos do Maps provisórias com cantos de 28px; fichas com nome completo, função e CRO |
| Prova social | Nota grande + colunas de depoimentos | 21st | **Vertical Testimonials Marquee** (shadcnspace) · alternativas: Testimonials Marquee (scrollxui), Testimonial Marquee (componentry) | Com só 5 depoimentos, o marquee vira lista estática (marquee com poucos itens repete demais). Nota 5,0 em Unbounded gigante |
| FAQ | Accordion | shadcn | `@shadcn/accordion` · alternativas: Proximity Accordion, Media Accordion | Linhas em `--cimento`, ícone + que gira para ×, texto 18px |
| CTA final + como chegar | Bloco escuro com loop de vídeo e mapa | — | Criado do zero | Fundo `VID-02` (IA) com overlay ameixa; endereço, horários e mapa do Google embutido com carregamento lazy |
| Rodapé | Wordmark gigante cortado na base | 21st | **Light Beam Footer with Giant Wordmark** (kedhareswer) · alternativas: Giant Wordmark Footer (kedhareswer), Large Name Footer (arihantcodes) | "Oral Face" em Unbounded cortado na base, sem feixe de luz; dados legais (EPAO, RT + CRO) bem legíveis |
| Títulos | Mask reveal ao entrar na tela | Motion | Busca por "text mask reveal split text" sem resultado gratuito; implementado com `motion` (`whileInView` + `overflow: hidden`) | Só nos títulos, uma vez, 600ms |

## Justificativas (1 linha cada)
- **Hero:** o Scroll-Locked é o único que já trava o scroll de verdade como o PROMPT_BASE pede; os outros só fazem crossfade ou escala.
- **Interruptor dentadura/fixa:** traduz direto o conteúdo que mais engaja no Instagram deles, sem mostrar paciente.
- **Protocolo sticky:** o processo é uma sequência real, e o arco fixo mostra a mudança melhor que cards.
- **Lista editorial:** hierarquia por tamanho em vez de grid de cards iguais.
- **Depoimentos estáticos:** honestos com o volume real (5 lidos) e mais legíveis para o público.
