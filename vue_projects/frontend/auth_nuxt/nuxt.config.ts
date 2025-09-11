// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui'],
  srcDir: 'src/',
  css: ['quasar/src/css/index.sass'],
  build: {
    transpile: ['quasar']
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@use "~/assets/quasar-variables.sass" as *\n`
        }
      }
    }
  },
   quasar: {
        plugins: ['Loading', 'Notify'],
  }
})