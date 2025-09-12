import { defineStore } from 'pinia'
import { languages } from '~/config/languages'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    current: 'en',
    messages: languages.en,
  }),
  actions: {
    setLanguage(lang) {
      console.log('[LanguageStore] setLanguage called with:', lang)

      if (languages[lang]) {
        this.current = lang
        this.messages = languages[lang]
        console.log('[LanguageStore] current:', this.current)
        console.log('[LanguageStore] messages:', this.messages)
      } else {
        console.warn('[LanguageStore] Invalid language code:', lang)
      }
    },
  },
  persist: true,
})
