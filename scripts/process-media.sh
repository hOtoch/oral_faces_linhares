#!/usr/bin/env bash
# Processa as mídias geradas/recebidas e atualiza videos.md / imagens.md.
# Uso (na raiz do projeto): bash scripts/process-media.sh
# Idempotente: pode rodar quantas vezes quiser.
set -euo pipefail

cd "$(dirname "$0")/.."
RAIZ="$(pwd)"
IMG_RAW="public/images/raw"
VID_RAW="public/videos/raw"
mkdir -p "$IMG_RAW" "$VID_RAW" public/images public/videos public/frames/hero tmp

tem() { command -v "$1" >/dev/null 2>&1; }

# ---------- Imagens ----------
converter_img() { # $1 origem  $2 destino.webp
  if tem cwebp; then
    cwebp -quiet -q 80 -resize 2000 0 "$1" -o "$2" 2>/dev/null || cwebp -quiet -q 80 "$1" -o "$2"
  elif python3 -c "import PIL" 2>/dev/null; then
    python3 - "$1" "$2" <<'PY'
import sys
from PIL import Image
i = Image.open(sys.argv[1]).convert("RGB")
if max(i.size) > 2000:
    i.thumbnail((2000, 2000))
i.save(sys.argv[2], "WEBP", quality=80)
PY
  elif tem ffmpeg; then
    ffmpeg -loglevel error -y -i "$1" -vf "scale='min(2000,iw)':-2" -c:v libwebp -q:v 80 "$2"
  else
    echo "  ✗ sem cwebp, Pillow ou ffmpeg para converter $1"; return 1
  fi
  echo "  ✓ $2"
}

echo "→ Imagens"
shopt -s nullglob
for f in "$IMG_RAW"/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}; do
  nome="$(basename "${f%.*}")"
  destino="public/images/$nome.webp"
  if [[ ! -f "$destino" || "$f" -nt "$destino" ]]; then converter_img "$f" "$destino"; fi
done
for f in "$IMG_RAW"/*.svg; do cp -f "$f" "public/images/$(basename "$f")"; echo "  ✓ public/images/$(basename "$f")"; done

# ---------- Vídeos ----------
if ! tem ffmpeg; then
  echo "⚠️  ffmpeg não encontrado. Instale com: sudo apt install ffmpeg  (vídeos não processados)"
else
  echo "→ Vídeos de loop"
  for f in "$VID_RAW"/*.{mp4,mov,webm}; do
    nome="$(basename "${f%.*}")"
    [[ "$nome" == "video" ]] && continue
    destino="public/videos/$nome.mp4"
    if [[ ! -f "$destino" || "$f" -nt "$destino" ]]; then
      ffmpeg -loglevel error -y -i "$f" -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -an -movflags +faststart "$destino"
      ffmpeg -loglevel error -y -i "$destino" -frames:v 1 -c:v libwebp -q:v 80 "public/videos/${nome}_poster.webp"
      echo "  ✓ $destino (+ poster)"
    fi
  done

  # ---------- Hero (VID-01) ----------
  ORIG=""
  [[ -f "video.mp4" ]] && ORIG="video.mp4"
  [[ -z "$ORIG" && -f "$VID_RAW/video.mp4" ]] && ORIG="$VID_RAW/video.mp4"
  if [[ -n "$ORIG" ]]; then
    echo "→ Hero ($ORIG)"
    [[ "$ORIG" == "video.mp4" ]] && cp -n video.mp4 "$VID_RAW/video.mp4" || true
    if [[ ! -f public/frames/hero/manifest.json || "$ORIG" -nt public/frames/hero/manifest.json ]]; then
      INFO="$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,codec_name:format=duration -of default=nw=1 "$ORIG")"
      W="$(echo "$INFO" | sed -n 's/^width=//p')"; H="$(echo "$INFO" | sed -n 's/^height=//p')"

      # prévia 1 frame/s para identificar as fases
      rm -f tmp/preview_*.jpg
      ffmpeg -loglevel error -y -i "$ORIG" -vf fps=1 tmp/preview_%03d.jpg

      # todos os frames como keyframe (fallback <video>)
      ffmpeg -loglevel error -y -i "$ORIG" -c:v libx264 -g 1 -crf 18 -pix_fmt yuv420p -an -movflags +faststart public/videos/hero.mp4

      # frames desktop (1920) e mobile (crop 9:16 centralizado, 1080)
      rm -rf public/frames/hero/desktop public/frames/hero/mobile
      mkdir -p public/frames/hero/desktop public/frames/hero/mobile
      ffmpeg -loglevel error -y -i "$ORIG" -vf "fps=24,scale=1920:-2" -c:v libwebp -q:v 78 public/frames/hero/desktop/%04d.webp
      if (( W * 16 > H * 9 )); then
        ffmpeg -loglevel error -y -i "$ORIG" -vf "fps=24,crop=ih*9/16:ih,scale=1080:-2" -c:v libwebp -q:v 78 public/frames/hero/mobile/%04d.webp
        MOBILE='"mobile": "/frames/hero/mobile", '
      else
        rmdir public/frames/hero/mobile; MOBILE=""
      fi
      VAZIOS="$(find public/frames/hero -name '*.webp' -size 0 | wc -l)"
      if (( VAZIOS > 0 )); then
        echo "  ✗ $VAZIOS frames saíram vazios (encoder WebP do ffmpeg). Nada foi publicado."; rm -f public/frames/hero/manifest.json; exit 1
      fi
      N="$(ls public/frames/hero/desktop | wc -l)"
      echo "{ \"count\": $N, \"desktop\": \"/frames/hero/desktop\", ${MOBILE}\"ext\": \"webp\" }" > public/frames/hero/manifest.json

      ffmpeg -loglevel error -y -i "$ORIG" -frames:v 1 -vf "scale=1920:-2" -c:v libwebp -q:v 85 public/videos/hero_poster.webp

      python3 - "$INFO" <<'PY'
import sys, re, datetime
info = dict(l.split("=", 1) for l in sys.argv[1].splitlines() if "=" in l)
p = "HERO_TIMELINE.md"
s = open(p, encoding="utf-8").read()
bloco = (f"Atualizado em {datetime.date.today():%d/%m/%Y}\n\n"
         f"- Resolução: {info.get('width')}×{info.get('height')}\n"
         f"- FPS: {info.get('r_frame_rate')}\n- Duração: {float(info.get('duration', 0)):.2f}s\n"
         f"- Codec: {info.get('codec_name')}\n- Prévia (1 frame/s): `tmp/preview_*.jpg`\n")
s = re.sub(r"## Dados do vídeo \(preenchido pelo script\)\n\n[\s\S]*$", "## Dados do vídeo (preenchido pelo script)\n\n" + bloco, s)
open(p, "w", encoding="utf-8").write(s)
PY
      echo "  ✓ public/videos/hero.mp4, $N frames, poster. Ajuste as fases no HERO_TIMELINE.md e em src/media/heroTimeline.ts"
    fi
  fi
fi

# ---------- Logo / SVG falso ----------
for f in public/images/*.svg; do
  [[ -f "$f" ]] || continue
  if ! head -c 512 "$f" | grep -qi "<svg\|<?xml"; then
    echo "  ✗ $f não é SVG ($(file -b "$f" | cut -d, -f1)). O navegador não exibe. Mova para public/images/raw/ com a extensão certa."
  fi
done

# ---------- Status nos .md ----------
python3 - <<'PY'
import os, re
def atualizar(md):
    linhas = open(md, encoding="utf-8").read().split("\n")
    for i, l in enumerate(linhas):
        if not re.match(r"\| (VID|IMG)-\d+ \|", l):
            continue
        caminhos = re.findall(r"`(public/[^`]+)`", l)
        final = [c for c in caminhos if "/raw/" not in c]
        alvo = final[-1] if final else None
        if not alvo:
            continue
        existe = os.path.exists(alvo) or (alvo.endswith("/") and os.path.exists(alvo + "manifest.json"))
        if "VID-01" in l:
            existe = os.path.exists("public/frames/hero/manifest.json")
        celulas = l.rstrip("|").split("|")
        status = celulas[-1].strip()
        if existe and not status.startswith("ok"):
            celulas[-1] = " ok "
        elif existe and status == "ok (provisória)" and any(os.path.exists(c) for c in caminhos if "/raw/" in c):
            celulas[-1] = " ok "
        linhas[i] = "|".join(celulas) + "|"
    open(md, "w", encoding="utf-8").write("\n".join(linhas))
for md in ("videos.md", "imagens.md"):
    if os.path.exists(md):
        atualizar(md)
PY

echo "→ Arquivos finais"
ls -lh public/images public/videos 2>/dev/null | grep -v '^total' || true
[[ -f public/frames/hero/manifest.json ]] && cat public/frames/hero/manifest.json
echo "Pronto."
