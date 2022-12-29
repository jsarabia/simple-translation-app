import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: "/",
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      emitter: path.resolve(__dirname, './node_modules/emitter-component')
    }
  }
})
