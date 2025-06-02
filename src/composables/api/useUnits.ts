import { useApi } from '@/composables/useApi'
import type { Unit } from '@/types/unit.i'

export function useUnits() {
  const api = useApi()
  const controller = 'Unit'

  async function getUnits(raceId: number): Promise<Unit[]> {
    return await api.get<Unit[]>(`/${controller}?raceId=${raceId}`)
  }

  async function createUnit(unit: FormData): Promise<Unit> {
    return await api.post<Unit>(`/${controller}`, unit)
  }

  async function deleteUnit(id: number): Promise<void> {
    await api.delete(`/${controller}/${id}`)
  }

  return {
    getUnits,
    createUnit,
    deleteUnit
  }
}
