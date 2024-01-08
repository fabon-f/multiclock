import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import kumaUi from '@kuma-ui/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), kumaUi()],
})
