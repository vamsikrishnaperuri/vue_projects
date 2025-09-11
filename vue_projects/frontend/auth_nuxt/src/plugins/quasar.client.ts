import { defineNuxtPlugin } from '#app'
import { Quasar,Notify } from 'quasar'
import quasarLang from 'quasar/lang/en-US'

// Quasar CSS & Icons
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Quasar, {
    plugins: {
      Notify,
    },
    lang: quasarLang
  })
  console.log('Quasar plugin loaded ')
})
