import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import { existsSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Resolves Figma Make-specific module specifiers so the project builds
// with standard Vite/npm outside of the Figma Make runtime.
//   figma:asset/<hash>.png  → /assets/<hash>.png if the file exists in public/assets/,
//                             otherwise empty string (images degrade gracefully)
//   figma:foundry-client-api → empty module stub
function figmaCompatPlugin(): Plugin {
  const ASSET_RE = /^figma:asset\//
  const FOUNDRY_ID = 'figma:foundry-client-api'
  const STUB_PREFIX = '\0figma:'

  return {
    name: 'vite-plugin-figma-compat',
    resolveId(id) {
      if (id === FOUNDRY_ID || ASSET_RE.test(id)) {
        return STUB_PREFIX + id
      }
    },
    load(id) {
      if (!id.startsWith(STUB_PREFIX)) return
      const original = id.slice(STUB_PREFIX.length)
      if (original === FOUNDRY_ID) {
        return 'export default {}'
      }
      if (ASSET_RE.test(original)) {
        // e.g. "figma:asset/abc123.png" → filename = "abc123.png"
        const filename = original.replace(ASSET_RE, '')
        const publicPath = path.resolve(__dirname, 'public', 'assets', filename)
        if (existsSync(publicPath)) {
          return `export default "/assets/${filename}"`
        }
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
