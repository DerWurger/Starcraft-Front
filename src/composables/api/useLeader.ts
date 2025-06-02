// import { ref, onMounted } from 'vue'
// import { mockedLeaders } from '@/mocks/leaders.mock.ts'
// import type { Leader } from '@/types/leader.i.ts'
// import { Race } from '@/types/race.enum.ts'
//
// export function useLeader(race: Race) {
//   const leader = ref<Leader | null>(null)
//
//   // TODO: replace with real API call
//   onMounted(() => {
//     leader.value = mockedLeaders[race]
//   })
//
//   return { leader }
// }

import { onMounted, ref } from 'vue'
import { useApi } from '@/composables/useApi'
import { Race } from '@/types/race.enum'
import type { Leader } from '@/types/leader.i'
import { raceToIdMap } from '@/utils/race.utils.ts'

export function useLeader(race: Race) {
  const leader = ref<Leader | null>(null)
  const api = useApi()

  const controller = 'Leader'

  const fetchLeader = async () => {
    const raceId = raceToIdMap[race]
    try {
      leader.value = await api.get<Leader>(`/${controller}/by-race/${raceId}`)
    } catch (e) {
      console.error('Failed to fetch leader', e)
    }
  }

  onMounted(fetchLeader)

  return { leader }
}
