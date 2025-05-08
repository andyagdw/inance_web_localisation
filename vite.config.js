/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Inject JQuery into project
import inject from "@rollup/plugin-inject";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [
    react(),

    inject({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: "./setupTests.jsx",
  //   css: true
  // },
  server: {
    port: 5000,
  }
});