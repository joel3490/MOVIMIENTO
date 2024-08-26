import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Asegúrate de que el directorio de salida es 'build'
  },
  server: {
    historyApiFallback: true, // Esto es importante para las SPA
  },
})
