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
        registerType: "autoUpdate",
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ],

        shortcuts: [
          {
            name: "Dashboard",
            url: "/u/0/dashboard",
            icons: [{
              src: 'android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },],
          },
          {
            name: "Project",
            url: "/u/0/project",
            icons: [{
              src: 'android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },],
          },
          {
            name: "Timesheet",
            url: "/u/0/timesheet",
            icons: [{
              src: 'android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },],
          },
        ],
      }
    })
  ]
})
