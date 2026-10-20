# IMAGENS — Oral Face Linhares

> **Como usar:**
> - **`IA`:** gere com o prompt e salve em `public/images/raw/` com o nome da coluna **Salvar como**.
> - **`FOTO REAL`:** **não gere por IA.** Repasse a descrição à clínica ou ao fotógrafo. Imagem gerada que pareça a equipe, o consultório ou um paciente real é enganosa e fere o Código de Ética Odontológica.
> - **`CLIENTE`:** peça o arquivo à clínica.
>
> Depois de salvar, rode `bash scripts/process-media.sh`. O script converte para WebP, coloca no caminho final e marca o status como `ok`. O site troca os placeholders sozinho.

| ID | Classe | Seção | Salvar como | Arquivo final | Proporção · mínimo | Status |
|---|---|---|---|---|---|---|
| IMG-01 | IA | Dentadura × prótese fixa | `public/images/raw/dentadura.png` | `public/images/dentadura.webp` | 4:3 · 1600×1200 | ok |
| IMG-02 | IA | Dentadura × prótese fixa | `public/images/raw/protese-fixa.png` | `public/images/protese-fixa.webp` | 4:3 · 1600×1200 | ok |
| IMG-03 | FOTO REAL | A clínica | `public/images/raw/fachada.jpg` | `public/images/fachada.webp` | 3:4 · 1500×2000 | ok (provisória) |
| IMG-04 | FOTO REAL | A clínica | `public/images/raw/recepcao.jpg` | `public/images/recepcao.webp` | 3:4 · 1500×2000 | ok (provisória) |
| IMG-05 | FOTO REAL | A clínica | `public/images/raw/consultorio.jpg` | `public/images/consultorio.webp` | 4:3 · 2000×1500 | pendente |
| IMG-06 | FOTO REAL | Equipe | `public/images/raw/dra-laysa.jpg` | `public/images/dra-laysa.webp` | 4:5 · 1600×2000 | ok |
| IMG-07 | FOTO REAL | Equipe | `public/images/raw/dra-kristiane.jpg` | `public/images/dra-kristiane.webp` | 4:5 · 1600×2000 | ok |
| IMG-08 | CLIENTE | Header e preloader | `assets-origem/logo-cliente-320.jpg` | `public/images/logo-*.webp` | vetor | ok provisória |

---

## IMG-01 · Dentadura `IA`
- **Salvar como:** `public/images/raw/dentadura.png`
- **Proporção / resolução mínima:** 4:3 · 1600×1200
- **Uso na página:** lado direito da comparação, quando o interruptor está em "Com dentadura". Fica ao lado do texto, então não precisa de espaço livre.
- **Fundo:** superfície lilás clara, a **mesma** da IMG-02 (as duas trocam entre si).

**Prompt:**
```
Studio product photograph of a conventional removable complete upper denture (full acrylic denture with pink gum base that covers the palate) resting on a matte pale lilac surface (#E7E0EF), three-quarter top-down angle, soft diffused daylight from the left, gentle natural shadow, slightly cool tones, generous negative space, clean editorial healthcare style, 4:3. Dental laboratory object only. No hands, no mouth, no person, no text, no logos, no watermark.
```

**Negative prompt:**
```
person, mouth, lips, hands, dirty, broken, blood, text, watermark, logo, cartoon, 3d render look, oversaturated
```

## IMG-02 · Prótese fixa sobre implantes (modelo ilustrativo) `IA`
- **Salvar como:** `public/images/raw/protese-fixa.png`
- **Proporção / resolução mínima:** 4:3 · 1600×1200
- **Uso na página:** lado direito da comparação, quando o interruptor está em "Com prótese fixa". Precisa ter o **mesmo ângulo, luz e fundo** da IMG-01.
- **Observação:** é um modelo de laboratório ilustrativo, não um caso da clínica.

**Prompt:**
```
Studio product photograph of a full-arch implant-supported fixed dental prosthesis on a white dental model: 12 natural-looking porcelain teeth on pink acrylic gum, attached to four visible titanium implants in the model base, palate left open. Resting on a matte pale lilac surface (#E7E0EF), three-quarter top-down angle, soft diffused daylight from the left with a subtle violet rim light (#6B3FA3), gentle natural shadow, generous negative space, clean editorial healthcare style, 4:3, matching a companion photo of a removable denture. Dental laboratory model only. No hands, no mouth, no person, no text, no logos, no watermark.
```

**Negative prompt:**
```
person, mouth, lips, hands, blood, surgery, text, watermark, logo, cartoon, extra teeth, warped teeth, oversaturated
```

---

## IMG-03 · Fachada `FOTO REAL`
- **Status:** usando a foto do Google Maps como **provisória** (`assets-origem/maps-01.jpg`, 982×1310, ⚠️ confirmar autorização).
- **Arquivo final:** `public/images/fachada.webp` · **3:4 · 1500×2000** (vertical)
- **Uso na página:** seção "A clínica", primeira foto da grade.

**Descrição da foto necessária:**
- **O quê:** fachada roxa da Oral Face, com a logo e a placa das dentistas legíveis.
- **Enquadramento:** de frente, câmera na altura do peito, fachada inteira na vertical, com um pouco de calçada e sem carros ou motos na frente.
- **Luz:** dia nublado ou fim de tarde, sem sol estourado na placa e sem reflexo forte no vidro.
- **Evitar:** pessoas passando, lixo, fios em primeiro plano.

## IMG-04 · Recepção `FOTO REAL`
- **Status:** usando a foto do Google Maps como **provisória** (`assets-origem/maps-02.jpg`, 1500×2000, ⚠️ confirmar autorização).
- **Arquivo final:** `public/images/recepcao.webp` · **3:4 · 1500×2000**
- **Uso na página:** seção "A clínica", segunda foto (deslocada para baixo).

**Descrição da foto necessária:**
- **O quê:** a recepção com a logo 3D na parede de cimento queimado, o cantinho do café e as poltronas.
- **Cenário:** arrumado, com flores ou plantas e sem papéis no balcão. Pode ter uma pessoa da equipe de costas ou desfocada.
- **Luz:** luz da própria clínica + luz natural, sem flash.
- **Enquadramento:** vertical, com a logo no terço superior.

## IMG-05 · Consultório `FOTO REAL`
- **Arquivo final:** `public/images/consultorio.webp` · **4:3 · 2000×1500** (horizontal)
- **Uso na página:** seção "A clínica", foto larga abaixo das duas verticais.

**Descrição da foto necessária:**
- **O quê:** sala de atendimento com a cadeira odontológica, limpa e organizada, com os equipamentos guardados.
- **Pessoas:** opcional. Se houver, a dentista ajustando a luz da cadeira, sem paciente identificável.
- **Luz:** luz natural + a luz da sala, sem flash. Tons brancos e lilás, combinando com a marca.
- **Enquadramento:** horizontal, com a câmera na altura da cadeira e uma lente grande-angular moderada (24–35mm) para não distorcer.
- **Evitar:** paciente na cadeira, sangue ou instrumentos expostos, telas com dados de pacientes.

## IMG-06 · Dra. Laysa Rossoni Bergamaschi `FOTO REAL`
- **Arquivo final:** `public/images/dra-laysa.webp` · **4:5 · 1600×2000** (vertical)
- **Uso na página:** ficha da equipe, com nome, função e CRO abaixo.

**Descrição da foto necessária:**
- **Quem:** Dra. Laysa, da cintura para cima, sorriso leve e confiante, olhando para a câmera.
- **Roupa:** jaleco branco ou roxo da clínica, fechado ou aberto sobre uma roupa lisa. Sem estampas e sem logos de terceiros.
- **Cenário / fundo:** parede de cimento queimado da recepção, desfocada (f/2–f/2.8), ou fundo liso lilás claro.
- **Luz:** natural lateral e suave, ou softbox. Sem flash direto.
- **Enquadramento:** câmera na altura dos olhos, com respiro acima da cabeça.
- **Consistência:** mesma luz, fundo e enquadramento da IMG-07, porque as duas aparecem lado a lado.

## IMG-07 · Dra. Kristiane Laís Barcellos `FOTO REAL`
- **Arquivo final:** `public/images/dra-kristiane.webp` · **4:5 · 1600×2000** (vertical)
- **Uso na página:** ficha da equipe, ao lado da IMG-06.

**Descrição da foto necessária:** a mesma da IMG-06 (mesma sessão, fundo e luz), com a Dra. Kristiane.

> Se houver mais profissionais na equipe, faça o mesmo retrato de cada um e me passe nome, função e CRO para eu incluir.

---

## IMG-08 · Logo `CLIENTE`
- **No site agora (provisório):** recorte da logo enviada (`assets-origem/logo-cliente-320.jpg`, JPEG 320×320 com fundo lilás). O fundo foi removido e geradas 4 versões em `public/images/`: `logo-escuro.webp` e `logo-claro.webp` (empilhada, usada no preloader), `logo-h-escuro.webp` e `logo-h-claro.webp` (horizontal, montada com a marca ao lado do nome, usada no header). "Escuro"/"claro" é o fundo onde ela aparece: branca ou violeta (#4A2478), com a pétala rosa.
- **O que pedir à clínica:** a logo em **vetor** (SVG, AI, EPS ou PDF), se existir uma versão horizontal oficial, e as cores oficiais (hex ou Pantone). O recorte de 320px fica um pouco macio em telas grandes.
- **Observação:** o arquivo enviado tinha extensão `.svg`, mas era um JPEG. Navegadores não exibem isso, por isso o site mostrava o nome tipografado. Com o vetor real, substitua as 4 versões (ou peça para gerá-las de novo).
