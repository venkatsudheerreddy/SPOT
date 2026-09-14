import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Stubs out figma:foundry-client-api so the project builds outside the
// Figma Make runtime without errors.
function figmaFoundryStubPlugin(): Plugin {
  return {
    name: 'vite-plugin-figma-foundry-stub',
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
    figmaFoundryStubPlugin(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})
