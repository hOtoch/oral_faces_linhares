# DESIGN — Oral Face Linhares

## Brief em uma frase
Landing page de uma clínica odontológica de bairro, acolhedora e conduzida por mulheres no Centro de Linhares, focada em quem usa dentadura ou perdeu dentes e quer **voltar a ter dentes fixos**. Toda ação termina no WhatsApp.

**Público principal:** adultos de 45 a 75 anos de Linhares, muitos com dentadura, que acessam pelo celular vindos do Instagram ou do Google. Precisam de **letra grande, contraste alto, botões grandes, linguagem simples** e de prova de que a clínica é confiável e próxima.

## Conceito: "o arco"
O arco dentário é o objeto central do tratamento (a prótese protocolo devolve um **arco de 12 dentes fixos**) e vira a assinatura gráfica do site:
- **Preloader:** 12 pontos em arco que acendem conforme a página carrega.
- **Hero:** a barra de progresso do vídeo controlado pelo scroll é o **arco de 12 dentes**, que vai se completando dente a dente (não uma barra vertical genérica).
- **Divisores:** uma curva fina de sorriso que se desenha ao entrar na tela, usada só entre os blocos principais.

É o **único elemento ousado**. O resto é calmo, com muito espaço em branco e alinhado à esquerda.

## Paleta (tirada da fachada, da recepção e da logo)
| Token | Hex | Uso |
|---|---|---|
| `--violeta` | `#4A2478` | cor da marca (fachada). CTAs, arco, destaques |
| `--ameixa` | `#22122E` | fundo das seções escuras (hero, protocolo, CTA final). Ameixa, não preto |
| `--lilas` | `#8A6FA5` | secundária: fundos de apoio, ícones, estados de hover |
| `--petala` | `#C47BAE` | acento raro (a folha rosa da logo): dente ativo do arco, foco |
| `--esmalte` | `#F6F4F8` | fundo principal claro: branco porcelana frio, sem creme |
| `--cimento` | `#D9D5CF` | linhas, bordas, superfícies (a parede de cimento queimado da recepção) |
| `--tinta` | `#2A2233` | texto principal no claro |
| `--nevoa` | `#6E6578` | texto secundário (contraste AA sobre `--esmalte`) |

Ritmo: hero escuro → conteúdo claro → protocolo escuro → claro → CTA final escuro.

## Tipografia
- **Unbounded** (Google Fonts, 500–700): títulos. Geométrica e arredondada, conversa com o lettering redondo da logo "Oral Face". Usada em sentence case e com tracking levemente negativo; o tamanho é o tratamento (até 7rem na hero).
- **Onest** (Google Fonts, 400–600): corpo e interface. Corpo com **18px no mínimo** (público mais velho) e entrelinha de 1,6.
- Sem fonte mono, sem eyebrows em caixa-alta, sem uma palavra em itálico no título.
- Fontes hospedadas em `public/fonts` (woff2).

## Layout
```
HERO (ameixa, 100vh, pinned)          PROTOCOLO (ameixa, sticky)
┌───────────────────────────┐         ┌──────────────┬──────────────┐
│ [vídeo/canvas fullbleed]  │         │ 1 Avaliação  │              │
│                           │         │ 2 Planej.    │  arco 12     │
│ Título grande             │         │ 3 Implantes  │  dentes      │
│ (esq., 60% da largura)    │         │ 4 Provisória │  (estado do  │
│                 ◜◝ arco   │         │ 5 Definitiva │   passo)     │
│ [WhatsApp]      ◟◞ prog.  │         └──────────────┴──────────────┘
└───────────────────────────┘
```
- Alinhamento à esquerda e grid de 12 colunas; conteúdo com no máximo cerca de 68 caracteres por linha.
- Cantos: 28px nas mídias grandes, 999px nos botões e 12px nos elementos pequenos. A hierarquia vem do tamanho, não de cards iguais.
- WhatsApp **fixo no mobile** (barra inferior) depois que a hero termina.

## Hero: variante A (vídeo controlado pelo scroll)
`VID-01` (classe IA): macro cinematográfico de um **modelo de prótese protocolo** (prótese fixa sobre implantes), sob luz violeta. Em 4 fases: escuro → implantes de titânio → prótese assentando → arco completo iluminado. Enquanto o vídeo não existir, o canvas desenha um placeholder animado e o arco de progresso funciona normalmente.

Textos por fase:
1. **Dentes fixos de novo.** · "Implantes e prótese protocolo em Linhares."
2. **Chega de dentadura que solta.** · "Mais firmeza para mastigar, falar e sorrir."
3. **Planejado para o seu caso.** · "Cada tratamento começa com uma avaliação individual."
4. **Oral Face Linhares** · CTA "Agendar avaliação no WhatsApp" · secundário "Ver como funciona"

## Seções
1. Hero (vídeo controlado pelo scroll + arco)
2. Faixa de serviços (marquee lento, em uma faixa só)
3. **Dentadura × prótese fixa:** um interruptor "Com dentadura / Com prótese fixa" troca a lista e a imagem. Conteúdo do post "3 verdades sobre a dentadura".
4. **Como funciona o protocolo:** 5 passos em sequência, com sticky. O arco acende conforme o passo.
5. **Tratamentos:** reabilitação em destaque; estética e clínica geral em lista expansível.
6. **A clínica e a equipe:** fachada e recepção (fotos do Maps, provisórias) e as dentistas com nome e CRO (fotos pendentes).
7. **Prova social:** 5,0 no Google (122 avaliações), +2.500 sorrisos e depoimentos reais.
8. **Perguntas frequentes**
9. **CTA final + como chegar:** endereço, horários, mapa e WhatsApp.
10. **Rodapé:** "Oral Face" gigante, EPAO, responsável técnica com CRO, links.

## Movimento
- Um momento orquestrado: a **hero** (scrub + arco).
- Reveals discretos só nos títulos (mask de baixo para cima, 600ms, `[0.76, 0, 0.24, 1]`), sem fade-up em cada card.
- Interações que respondem ao usuário: interruptor dentadura/fixa, passos do protocolo, acordeões e botões magnéticos só nos CTAs de WhatsApp.
- Sem cursor customizado: público mais velho e maioria no celular.
- `prefers-reduced-motion`: sem scrub (poster + textos da fase 4), arco já completo.

## Revisão contra os defaults (o que mudei e por quê)
- Troquei a barra de progresso vertical do prompt base pelo **arco de 12 dentes**: é específico do tratamento.
- Tirei os kickers "01 / SEÇÃO" em mono caixa-alta: são chrome de template, e a numeração só aparece no protocolo, que é sequência de verdade.
- Não usei creme nem preto: o claro é porcelana fria e o escuro é ameixa, ambos derivados da marca.
- Tirei o cursor customizado e o Three.js: não servem a esse público.
