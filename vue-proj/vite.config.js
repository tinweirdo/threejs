import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  chainWebpack: config => {
    config.resolve.alias
      .set('@comp', path.resolve(__dirname, './src/components'))
  }
})
