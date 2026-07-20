import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/CS/', // ⚠️ Must have both slashes and be capitalized 'CS'!
})