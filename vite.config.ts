import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cpSync } from 'node:fs';

export default defineConfig({
  base: './',
  css: { lightningcss: { errorRecovery: true } },
  plugins: [react(), {
    name: 'preserve-portfolio-pages',
    closeBundle() {
      for (const directory of ['work', 'common', 'img']) {
        cpSync(directory, `dist/${directory}`, { recursive: true });
      }
    },
  }],
});
