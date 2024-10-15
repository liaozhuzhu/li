import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.', // Copy manifest to the root of the build folder
        },
        {
          src: 'src/scripts/content.js', // Source path in src
          dest: 'scripts', // Copy to 'scripts' folder in the build output
        },
      ],
    }),
  ],
  build: {
    outDir: 'build', // Specify output directory
    rollupOptions: {
      input: {
        main: './index.html', // Entry point
      },
    },
  },
});
