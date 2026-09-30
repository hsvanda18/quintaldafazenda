import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TELEMOVEL_NUMERO } from './src/config'

export default defineConfig({
  plugins: [
    react(),
    {
      // O JSON-LD do index.html lê o telemóvel de src/config.ts
      name: 'telemovel-no-html',
      transformIndexHtml: (html) => html.replace(/%TELEMOVEL%/g, TELEMOVEL_NUMERO),
    },
  ],
})
