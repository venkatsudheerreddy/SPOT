import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import { existsSync, mkdirSync, readdirSync, copyFileSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Resolves Figma Make-specific module specifiers so the project builds
// with standard Vite/npm outside of the Figma Make runtime.
//
// figma:asset/<hash>.png resolution priority:
//   1. root assets/<hash>.png  — Figma Make's native file location.
//      At build-start, any files found there are copied into public/assets/
//      so Vite serves them as static files at /assets/<filename>.
//   2. public/assets/<hash>.png — static fallback already in public/
//   3. empty string             — graceful degradation (broken img, no crash)
//
// figma:foundry-client-api → empty module stub
function figmaCompatPlugin(): Plugin {
  const ASSET_RE = /^figma:asset\//
  const FOUNDRY_ID = 'figma:foundry-client-api'
  const STUB_PREFIX = '\0figma:'

  return {
    name: 'vite-plugin-figma-compat',
    enforce: 'pre',

    // Copy any files from root assets/ → public/assets/ before the build starts.
    // Vite copies public/ into dist/ verbatim, so the images will be available
    // at /assets/<filename> in both dev and production.
    buildStart() {
      const rootAssetsDir = path.resolve(__dirname, 'assets')
      const publicAssetsDir = path.resolve(__dirname, 'public', 'assets')
      if (existsSync(rootAssetsDir)) {
        mkdirSync(publicAssetsDir, { recursive: true })
        for (const file of readdirSync(rootAssetsDir)) {
          const src = path.join(rootAssetsDir, file)
          const dst = path.join(publicAssetsDir, file)
          if (!existsSync(dst)) {
            copyFileSync(src, dst)
          }
        }
      }
    },

    resolveId(id) {
      if (id === FOUNDRY_ID || ASSET_RE.test(id)) {
        return STUB_PREFIX + id
      }
    },

    load(id) {
      if (!id.startsWith(STUB_PREFIX)) return
      const original = id.slice(STUB_PREFIX.length)

      if (original === FOUNDRY_ID) return 'export default {}'

      if (ASSET_RE.test(original)) {
        const filename = original.replace(ASSET_RE, '') // e.g. "abc123.png"
        // Check public/assets/ (includes files copied from root assets/ above)
        const publicPath = path.resolve(__dirname, 'public', 'assets', filename)
        if (existsSync(publicPath)) {
          return `export default "/assets/${filename}"`
        }
        // No file found — degrade gracefully
        return 'export default ""'
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaCompatPlugin(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})
