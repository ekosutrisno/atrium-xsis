/* eslint-disable no-alert, no-console */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "Atrium",
        short_name: "Atrium",
        theme_color: "#1b2b32",
        background_color: "#1b2b32",
        description: "Organize and Manage HRIS easily",
        icons: [
          {
            "src": "icons/android-icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable any"
          },
          {
            "src": "icons/apple-icon-180x180.png",
            "sizes": "180x180",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "icons/android-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "icons/favicon-16x16.png",
            "sizes": "16x16",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "icons/favicon-96x96.png",
            "sizes": "96x96",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "icons/favicon-32x32.png",
            "sizes": "32x32",
            "type": "image/png",
            "purpose": "any"
          }
        ],
        
        shortcuts: [
          {
            name: "Dashboard",
            url: "/u/0/dashboard",
            icons: [{
              "src": "icons/favicon-96x96.png",
              "sizes": "96x96",
              "type": "image/png",
              "purpose": "any"
            },],
          },
          {
            name: "Project",
            url: "/u/0/project",
            icons: [{
              "src": "icons/favicon-96x96.png",
              "sizes": "96x96",
              "type": "image/png",
              "purpose": "any"
            },],
          },
          {
            name: "Timesheet",
            url: "/u/0/timesheet",
            icons: [{
              "src": "icons/favicon-96x96.png",
              "sizes": "96x96",
              "type": "image/png",
              "purpose": "any"
            },],
          },
        ],
      }
    })
  ]
})
