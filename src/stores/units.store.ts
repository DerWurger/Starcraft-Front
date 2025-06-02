import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Race } from '@/types/race.enum'
import type { Unit } from '@/types/unit.i.ts'
import { raceToIdMap } from '@/utils/race.utils.ts'
import { useRaceTheme } from '@/composables/useRaceTheme.ts'
import { useUnits } from '@/composables/api/useUnits.ts'
import { toast } from '@/composables/toast.ts'

export const useUnitStore = defineStore('unit', () => {
  const currentRace = ref<Race | null>(null)
  const currentRaceId = computed(() => (currentRace.value ? raceToIdMap[currentRace.value] : null))
  const units = ref<Unit[]>([])

  const unitApi = useUnits()

  const unitList = computed(() => units.value)

  async function setRace(race: Race) {
    currentRace.value = race
    useRaceTheme().setTheme(race)
    const raceId = raceToIdMap[race]
    await loadUnits(raceId)
  }

  async function loadUnits(raceId: number) {
    try {
      units.value = await unitApi.getUnits(raceId)
    } catch (error: any) {
      toast.show(error as string[], 'error')
      units.value = []
    }
  }

  async function addUnit(unit: FormData) {
    try {
      const created = await unitApi.createUnit(unit)
      // units.value.push(created)
      units.value = [...units.value, created]
    } catch (error: any) {
      console.error(error)
      toast.show(error as string[], 'error')
    }
  }

  async function removeUnit(id: number) {
    try {
      await unitApi.deleteUnit(id)
      units.value = units.value.filter((u) => u.id !== id)
    } catch (error: any) {
      toast.show(error as string[], 'error')
    }
  }

  return {
    currentRace,
    currentRaceId,
    setRace,
    unitList,
    addUnit,
    removeUnit
  }
})
