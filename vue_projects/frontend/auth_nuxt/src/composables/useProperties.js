import { useThemeStore } from '~/stores/theme'
import { useLanguageStore } from '~/stores/language'
import { computed } from 'vue'

export function useAppColors() {
  const theme = useThemeStore()
  return computed(() => theme.colors)
}

export function useAppLanguage() {
  const lang = useLanguageStore()
  const t = (key) => {
    const value = lang.messages[key] || key
    console.log(`[Translator] key="${key}", value="${value}", current="${lang.current}"`)
    return value
  }
  return { t, lang }
}