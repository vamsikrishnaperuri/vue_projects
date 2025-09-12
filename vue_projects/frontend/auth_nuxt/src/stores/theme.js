import { defineStore } from 'pinia'
import { lightColors, darkColors } from '~/config/colors'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: 'light',
    colors: lightColors,
  }),
  actions: {
    setMode(mode) {
      this.mode = mode
      this.colors = mode === 'light' ? lightColors : darkColors
      this.applyColors()
    },
    toggleTheme() {
      console.log("toggle entered")
      this.setMode(this.mode === 'light' ? 'dark' : 'light')
    },
    setColors(newColors) {
      this.colors = { ...this.colors, ...newColors }
      this.applyColors()
    },
    applyColors() {
      const root = document.documentElement
      Object.entries(this.colors).forEach(([key, value]) => {
        root.style.setProperty(`--app-${key}`, value)
      })
    },
    initTheme() {
      this.applyColors()
    },
  },
  persist: true,
})
