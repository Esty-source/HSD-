import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Expose to all network interfaces
    port: 8080,      // Use a different port that might not be blocked
    open: false,     // Don't open browser automatically
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'], // Pre-bundle common dependencies
  },
  build: {
    target: 'esnext', // Modern browsers for better performance
    minify: 'terser',  // Better minification
    cssMinify: true,   // Minify CSS
  }
})
