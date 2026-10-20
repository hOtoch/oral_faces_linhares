import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // projeto em /mnt/d (WSL): sem polling o Vite não vê as edições
  server: { watch: { usePolling: true, interval: 300 } },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
