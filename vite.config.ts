import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import process from 'process';

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
          framer: ['framer-motion'],
          lenis: ['@studio-freight/lenis'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['gsap', 'framer-motion', '@studio-freight/lenis'],
  },
});
