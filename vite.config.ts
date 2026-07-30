import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router")) {
              return "vendor-react"
            }
            if (id.includes("framer-motion")) return "vendor-animations"
            if (id.includes("lucide")) return "vendor-icons"
            if (id.includes("canvas-confetti") || id.includes("@number-flow")) return "vendor-effects"
            return "vendor-other"
          }
        },
      },
    },
  },
})
