import { ref } from 'vue'
import { Race } from '@/types/race.enum.ts'

const currentTheme = ref<Race>(Race.ZERG)

export function useRaceTheme() {
  function setTheme(theme: Race) {
    currentTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
  }

  return {
    currentTheme,
    setTheme
  }
}
