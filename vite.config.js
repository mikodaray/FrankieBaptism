import { defineConfig } from 'vite'

export default defineConfig({
  // Base path for GitHub Pages deployment
  // Replace 'your-repo-name' with your actual repository name
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate sourcemaps for debugging
    sourcemap: false,
    // Use esbuild for minification (default, no extra dependency needed)
    minify: 'esbuild'
  },
  server: {
    port: 3000,
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
