# VÍDEOS — Oral Face Linhares

> **Como usar:** gere cada vídeo com o prompt indicado e salve com o nome da coluna **Salvar como**. Depois rode `bash scripts/process-media.sh` na raiz do projeto. O script gera as versões otimizadas, os frames da hero e os posters, e marca o status como `ok`. O site troca os placeholders sozinho, sem mexer no código.
>
> Requisito: `ffmpeg` instalado (`sudo apt install ffmpeg`).

| ID | Classe | Seção | Salvar como | Arquivo final | Proporção | Duração | Loop? | Status |
|---|---|---|---|---|---|---|---|---|
| VID-01 | IA | Hero (scroll) | `video.mp4` (raiz do projeto) | `public/frames/hero/` + `public/videos/hero.mp4` | 16:9 · 1920×1080 | 8–10s | não | ok |
| VID-02 | IA | CTA final (fundo) | `public/videos/raw/cta-loop.mp4` | `public/videos/cta-loop.mp4` | 16:9 · 1920×1080 | 6s | sim | ok |

---

## VID-01 · Hero controlada pelo scroll `IA` (v2: "a peça que encaixa")
- **Salvar como:** `video.mp4` na raiz do projeto (substitui o anterior; depois rode `bash scripts/process-media.sh`)
- **Proporção / resolução:** 16:9 · 1920×1080 no mínimo (4K se o gerador permitir, por causa do recorte vertical no celular)
- **Duração:** 8 a 10s · **Loop:** não · **Uma tomada só, sem cortes**
- **Ideia:** em vez do arco inteiro (12 dentes e uma montagem complexa, em que a IA deforma os dentes), **um único implante em vista explodida**, como num comercial de relógio: coroa de porcelana em cima, pilar (abutment) no meio e parafuso de titânio embaixo, alinhados num eixo vertical e flutuando com espaço entre si. A câmera desce pelo eixo e, no fim, as três peças se aproximam e encaixam. São poucos objetos, simples e rígidos, que os geradores fazem bem. A metáfora é a promessa da clínica: um dente fixo, firme e planejado.
- **Por que IA:** é um componente de laboratório (objeto genérico). Não mostra paciente, boca nem resultado.

### Composição (vale para o quadro inteiro do vídeo)
- Fundo ameixa escuro e liso (#22122E), sem chão visível nem horizonte. Assim o canvas se funde com a seção.
- O eixo das peças fica a **~62% da largura** (um pouco à direita do centro) e ocupa só uma faixa estreita. Motivo: no desktop o texto ocupa o terço esquerdo, e no celular o site recorta o centro do quadro em 9:16. Nessa posição o objeto aparece inteiro nos dois.
- O terço esquerdo fica sempre escuro e vazio.
- Luz: contorno violeta (#6B3FA3) vindo de trás à esquerda e um toque rosa (#C47BAE) do lado direito, sem luz branca dura de frente. O titânio fica grafite com reflexos finos, e a porcelana branca levemente perolada.
- Movimento lento e **constante do começo ao fim** (o scroll controla o vídeo: aceleração ou pausa viram tranco).

### Fases (casam com os textos da hero)
| Tempo | O que acontece | Texto na tela |
|---|---|---|
| 0–25% | Quase escuro. A luz violeta acende devagar e revela só o contorno da coroa de porcelana, no alto do quadro, em close. | "Dentes fixos de novo." |
| 25–50% | A câmera desce suavemente pelo eixo: passa pelo pilar e chega ao parafuso de titânio, com as roscas em detalhe macro. | "Chega de dentadura que solta." |
| 50–75% | A câmera se afasta um pouco e mostra as três peças alinhadas, flutuando com espaço entre si (vista explodida). | "Planejado para o seu caso." |
| 75–100% | As peças se aproximam devagar e encaixam numa unidade só. Um brilho rosa suave percorre a coroa e a câmera faz meia órbita lenta. O último quadro fica parado e limpo. | "Oral Face Linhares" + botão |

### Como gerar (recomendado: quadro inicial + quadro final)
Gere primeiro as duas imagens abaixo, no mesmo gerador e com a mesma *seed* ou referência de estilo. Depois use o modo **imagem para vídeo com quadro inicial e final** (Kling "start/end frame", Veo "first and last frame", Runway "first/last keyframe", Luma "keyframes") com o prompt de vídeo. Isso trava o enquadramento e evita que o objeto mude de forma no meio. Se o gerador não aceitar quadro final, use só o inicial.

**Quadro inicial (imagem, 16:9):**
```
Ultra-detailed macro product photograph, 16:9. Extreme close-up of the top of a single white porcelain dental crown (a molar crown, natural tooth shape, subtle pearlescent glaze), floating in near darkness against a seamless deep plum background (#22122E). Only a thin violet rim light (#6B3FA3) from behind left traces the crown's silhouette; the rest of the frame is almost black. The crown sits slightly right of center at about 62% of the frame width, upper part of the frame. Left third completely empty and dark. Shallow depth of field, 100mm macro lens, luxury watch commercial aesthetic. No people, no mouth, no gums, no hands, no text, no logos.
```

**Quadro final (imagem, 16:9):**
```
Ultra-detailed product photograph, 16:9, luxury watch commercial aesthetic. A single complete dental implant assembly standing vertically and floating in the air: a white porcelain molar crown seated on a titanium abutment, which sits on a threaded titanium implant screw, all perfectly aligned on one vertical axis and joined as one piece. Centered at about 62% of the frame width, occupying the middle 70% of the frame height, generous empty space around it. Seamless deep plum background (#22122E), no floor, no horizon. Violet rim light (#6B3FA3) from behind left, soft pink accent light (#C47BAE) from the right, fine silver highlights on the titanium threads, soft pearlescent glow on the porcelain. Left third empty and dark. Clean, calm, premium dental technology. No people, no mouth, no gums, no hands, no text, no logos.
```

**Prompt do vídeo:**
```
One continuous cinematic shot, no cuts, 8 seconds, 16:9, luxury product commercial, extremely slow and constant camera speed from start to end, no sudden moves, no speed ramps.

Subject: three dental implant components floating on one vertical axis in an exploded view, positioned slightly right of center (about 62% of the frame width): at the top a white porcelain molar crown with a subtle pearlescent glaze, in the middle a small titanium abutment, at the bottom a threaded titanium implant screw. Seamless deep plum background (#22122E), no floor, no horizon, the left third of the frame always empty and dark for text.

Timeline:
0-2s: near darkness, a violet rim light (#6B3FA3) slowly fades in from behind left and reveals only the silhouette of the porcelain crown in extreme close-up at the top of the frame.
2-4s: the camera glides smoothly downward along the vertical axis, passing the abutment and arriving at the titanium screw, macro detail of the threads catching thin silver highlights.
4-6s: the camera slowly pulls back to show all three components aligned and floating apart with small even gaps between them, a soft pink accent light (#C47BAE) appears on the right side.
6-8s: the three components drift together slowly and precisely and join into one single implant assembly, a gentle pink glow sweeps across the crown, the camera makes a slow half orbit and settles; the final frame holds still, clean and calm.

Look: 100mm macro lens, shallow depth of field, soft volumetric haze, high-end studio lighting, photorealistic materials, sharp focus on the subject, smooth motion, stable geometry. No people, no face, no mouth, no lips, no gums, no hands, no text, no logos, no watermark.
```

**Negative prompt:**
```
person, face, mouth, lips, gums, tongue, hands, blood, surgery, x-ray, full denture, multiple teeth, extra teeth, warped tooth, melting, morphing, deformed screw, text, watermark, logo, cartoon, plastic look, flicker, jitter, fast motion, camera shake, jump cut, bright white background, floor, reflections of a studio
```

### Checklist antes de salvar
- [ ] As três peças mantêm a forma do início ao fim (sem derreter nem trocar de formato).
- [ ] O terço esquerdo fica escuro em todo o vídeo.
- [ ] O objeto continua inteiro se você imaginar um recorte vertical estreito no centro do quadro (versão celular).
- [ ] A velocidade é constante, sem paradas ou acelerações no meio.
- [ ] O último quadro é parado e limpo (é a imagem que fica quando o scroll libera a página).

Se o encaixe final sair estranho, gere só até a vista explodida (6s) e me avise: dá para parar o vídeo ali e deixar a fase 4 com outro movimento de câmera.

## VID-02 · Fundo do CTA final `IA`
- **Salvar como:** `public/videos/raw/cta-loop.mp4`
- **Proporção / resolução:** 16:9 · 1920×1080
- **Duração:** 6s · **Loop perfeito:** sim
- **Uso na página:** fundo da seção "Seu sorriso fixo começa com uma conversa", a 45% de opacidade, com um véu ameixa por cima. O título branco fica em cima, então o quadro deve ser escuro e calmo.
- **Câmera:** estática.

**Prompt:**
```
Seamless looping abstract background, 6 seconds, 16:9, static camera. Slow, soft caustic light ripples in deep violet (#4A2478) and soft lilac (#8A6FA5) drift gently across a matte dark plum surface (#22122E), like light passing through water onto polished porcelain. Very subtle motion, calm and elegant, low contrast, darker and quieter in the center of the frame for text overlay. Cinematic, soft focus. No objects, no people, no text, no logos, no watermark, seamless loop.
```

**Negative prompt:**
```
text, watermark, logo, people, objects, bright highlights, fast motion, flicker, noise, banding
```
