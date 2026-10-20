# HERO TIMELINE — VID-01

> **Status: provisório.** O `video.mp4` ainda não existe. As fases abaixo dividem o vídeo em 4 partes iguais e estão em `src/media/heroTimeline.ts`.
> Quando o vídeo chegar, rode `bash scripts/process-media.sh`: ele grava aqui os dados do `ffprobe` e gera os frames de prévia em `tmp/preview_*.jpg`. Olhe os frames, ajuste os limites desta tabela e de `heroTimeline.ts`.

| Fase | Início → fim (s) | Início → fim (%) | O que deve acontecer no vídeo | Texto na tela | Marcador do arco |
|---|---|---|---|---|---|
| 1 | 0 → 2 | 0 → 25% | Escuro, luz violeta revela o arco de porcelana | **Dentes fixos de novo.** | Implantes |
| 2 | 2 → 4 | 25 → 50% | Implantes de titânio entram em foco | **Chega de dentadura que solta.** | Firmeza |
| 3 | 4 → 6 | 50 → 75% | A prótese assenta sobre os implantes | **Planejado para o seu caso.** | Planejamento |
| 4 | 6 → 8 | 75 → 100% | Arco completo iluminado, câmera se afasta | **Oral Face Linhares** + CTA | Seu sorriso |

## Dados do vídeo (preenchido pelo script)

Atualizado em 19/10/2026

- Resolução: 1920×1080
- FPS: 24/1
- Duração: 8.00s
- Codec: h264
- Prévia (1 frame/s): `tmp/preview_*.jpg`
