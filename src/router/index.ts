import { createRouter, createWebHistory } from 'vue-router'
import { Race } from '@/types/race.enum.ts'
import ZergView from '@/views/ZergView.vue'
import TerranView from '@/views/TerranView.vue'
import ProtossView from '@/views/ProtossView.vue'

const routes = [
  { path: '/', redirect: `/${Race.TERRAN}` },
  { path: `/${Race.ZERG}`, name: Race.ZERG, component: ZergView },
  { path: `/${Race.TERRAN}`, name: Race.TERRAN, component: TerranView },
  { path: `/${Race.PROTOSS}`, name: Race.PROTOSS, component: ProtossView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
