import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    host: '0.0.0.0',  // Ensures Vite listens on all network interfaces
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://project_backend_1:3000', // Your backend server
        changeOrigin: true
      }
    }
  }
});
