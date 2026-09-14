import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import { existsSync, mkdirSync, readdirSync, copyFileSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Copies image files from the repository's root assets/ directory into
// public/assets/ before every build, so Vite serves them as static files at
// /assets/<filename> in both dev and production (dist/assets/).
//
// Root assets/ is Figma Make's native binary-file location; it is not served
// by Vite automatically. Copying into public/ is the minimal change needed to
// make all /assets/<filename> references work on Vercel and locally.
//
// Handles figma:foundry-client-api (Figma Make internal module) with an empty
// stub so the project continues to build outside the Figma Make runtime.
function assetCopyPlugin(): Plugin {
  return {
    name: 'vite-plugin-asset-copy',
    enforce: 'pre',

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

    // Stub out the Figma Make internal module so builds don't fail
    // when running outside the Figma Make runtime.
    resolveId(id) {
      if (id === 'figma:foundry-client-api') return '\0figma:foundry-client-api'
    },
    load(id) {
      if (id === '\0figma:foundry-client-api') return 'export default {}'
    },
  }
}


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    assetCopyPlugin(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})
