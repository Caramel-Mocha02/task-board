import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 用: https://caramel-mocha02.github.io/task-board/ で公開するため
// リポジトリ名をベースパスに設定する
export default defineConfig({
  base: '/task-board/',
  plugins: [react()],
})
