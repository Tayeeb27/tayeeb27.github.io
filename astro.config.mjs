import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://tayeebislam.com',
  integrations: [react()],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
