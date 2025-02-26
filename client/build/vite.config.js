// filepath: /g:/sohail-hazary-siam/hazary/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'client', // Adjust this path if your index.html is in a different directory
  build: {
    outDir: 'build',
  },
});