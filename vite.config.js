import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // Base path for GitHub Pages deployment
  // Replace 'your-repo-name' with your actual repository name
  base: './',
  plugins: [
    // GitHub Pages serves extension-less URLs by falling back to the
    // matching .html file (e.g. /confirmed -> confirmed.html) without a
    // redirect, so the address bar stays clean. Mirror that locally so
    // `npm run dev` matches production instead of 404ing on /confirmed.
    {
      name: 'extensionless-html-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const [path, query] = (req.url || '').split('?');
          if (path === '/confirmed' || path === '/confirmed/') {
            req.url = `/confirmed.html${query ? `?${query}` : ''}`;
          }
          next();
        });
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate sourcemaps for debugging
    sourcemap: false,
    // Use esbuild for minification (default, no extra dependency needed)
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        confirmed: resolve(__dirname, 'confirmed.html')
      }
    }
  },
  server: {
    port: 4300,
    open: true,
    watch: {
      // Ignore Visual Studio files to prevent EBUSY errors
      ignored: ['**/.vs/**', '**/node_modules/**', '**/dist/**']
    }
  },
  preview: {
    port: 4173
  }
})
