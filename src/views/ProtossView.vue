<!--<script setup lang="ts">-->
<!--import { computed, onMounted, ref } from 'vue'-->
<!--import { useRaceTheme } from '@/composables/useRaceTheme'-->
<!--import { Race } from '@/types/race.enum.ts'-->
<!--import { useLeader } from '@/composables/api/useLeader.ts'-->
<!--import UnitCard from '@/components/UnitCard.vue'-->
<!--import { useUnitStore } from '@/stores/units.store.ts'-->
<!--import type { Unit } from '@/types/unit.i.ts'-->

<!--//TODO: Remove-->
<!--import artanisImg from '@/assets/mock-assets/protosses/artanis1-transparent.png'-->

<!--const { leader } = useLeader(Race.PROTOSS)-->

<!--const unitStore = useUnitStore()-->

<!--const sortMode = ref<'original' | 'asc' | 'desc'>('original')-->
<!--const originalUnits = ref<Unit[]>([])-->

<!--const sortedUnits = computed(() => {-->
<!--  if (sortMode.value === 'original') return originalUnits.value-->

<!--  return originalUnits.value.slice().sort((a, b) => {-->
<!--    return sortMode.value === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)-->
<!--  })-->
<!--})-->

<!--function removeUnit(id: number) {-->
<!--  originalUnits.value = originalUnits.value.filter((u) => u.id !== id)-->
<!--}-->

<!--onMounted(async () => {-->
<!--  await unitStore.setRace(Race.PROTOSS)-->
<!--  originalUnits.value = [...unitStore.unitList]-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--  <section v-if="leader" class="flex items-center gap-8 rounded-xl p-6 lg:justify-center">-->
<!--    &lt;!&ndash; about leader section &ndash;&gt;-->
<!--    <div class="relative flex-1 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">-->
<!--      <h2 class="font-heading text-3xl uppercase tracking-widest text-primary md:text-5xl">-->
<!--        {{ leader.name }}-->
<!--      </h2>-->
<!--      <p class="mt-4 text-lg leading-relaxed text-base-content">-->
<!--        {{ leader.description }}-->
<!--      </p>-->
<!--      <a-->
<!--        :href="leader.wiki"-->
<!--        target="_blank"-->
<!--        rel="noopener"-->
<!--        class="mt-4 inline-block text-primary underline transition hover:text-accent"-->
<!--      >-->
<!--        Learn more on StarCraft Wiki →-->
<!--      </a>-->
<!--      <div class="absolute bottom-[-90%] left-0 flex gap-4">-->
<!--        <button class="btn btn-primary btn-outline" @click="sortMode = 'original'">Original</button>-->
<!--        <button class="btn btn-primary btn-outline" @click="sortMode = 'asc'">A → Z</button>-->
<!--        <button class="btn btn-primary btn-outline" @click="sortMode = 'desc'">Z → A</button>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; leader image &ndash;&gt;-->
<!--    <div class="max-w-sm flex-1">-->
<!--      <img-->
<!--        :src="artanisImg"-->
<!--        alt="Leader Image"-->
<!--        class="pointer-events-none w-full sm:scale-100 md:scale-125"-->
<!--      />-->
<!--    </div>-->
<!--  </section>-->

<!--  <transition-group-->
<!--    name="protoss"-->
<!--    tag="section"-->
<!--    class="mt-6 flex flex-row flex-wrap justify-center gap-4 bg-[&#45;&#45;card-bg] p-2"-->
<!--  >-->
<!--    <div v-for="unit in sortedUnits" :key="unit.id" class="protoss relative">-->
<!--      <UnitCard :unit="unit" image-position="top" />-->
<!--      <button @click="removeUnit(unit.id)" class="btn btn-error btn-xs absolute right-2 top-2">-->
<!--        ×-->
<!--      </button>-->
<!--    </div>-->
<!--  </transition-group>-->

<!--  &lt;!&ndash;  <section class="flex flex-row flex-wrap justify-center gap-4 bg-[&#45;&#45;card-bg] p-2">&ndash;&gt;-->
<!--  &lt;!&ndash;    <UnitCard v-for="unit in sortedUnits" :key="unit.name" :unit="unit" :image-position="'top'" />&ndash;&gt;-->
<!--  &lt;!&ndash;  </section>&ndash;&gt;-->
<!--</template>-->

<!--<style>-->
<!--.protoss-enter-from {-->
<!--  box-shadow: 0 0 128px 64px color-mix(in srgb, hsl(var(&#45;&#45;s)) 30%, hsl(var(&#45;&#45;p)));-->
<!--  transform: translateY(-100%);-->
<!--  filter: blur(24px) brightness(2);-->
<!--  opacity: 0;-->
<!--}-->

<!--.protoss-enter-active {-->
<!--  transition: all 1000ms ease-in-out;-->
<!--}-->

<!--.protoss-enter-to {-->
<!--  box-shadow: none;-->
<!--  background-color: transparent;-->
<!--  transform: translateY(0);-->
<!--  filter: none;-->
<!--  opacity: 1;-->
<!--}-->

<!--.protoss-move {-->
<!--  transition: transform 400ms ease;-->
<!--}-->

<!--.protoss-leave-from {-->
<!--  opacity: 1;-->
<!--  transform: translateY(0) scale(1);-->
<!--  filter: none;-->
<!--  box-shadow: none;-->
<!--}-->

<!--.protoss-leave-active {-->
<!--  transition: all 1000ms ease-in-out;-->
<!--}-->

<!--.protoss-leave-to {-->
<!--  opacity: 0;-->
<!--  transform: translateY(-100%) scale(0.1);-->
<!--  filter: blur(24px) brightness(2);-->
<!--  box-shadow: 0 0 128px 64px hsl(var(&#45;&#45;s));-->
<!--}-->
<!--</style>-->

<script setup lang="ts">
import RacePage from './RacePage.vue'
import { Race } from '@/types/race.enum.ts'
import { getImageUrl } from '@/utils/url.utils.ts'
import { useCreateUnitModal } from '@/stores/useCreateUnitModal.store.ts'

const modal = useCreateUnitModal()
</script>

<template>
  <RacePage :race="Race.PROTOSS" transitionName="protoss" unitImagePosition="top">
    <template #leader-image="{ leader }">
      <div class="max-w-sm flex-1">
        <img
          :src="getImageUrl(leader.image)"
          alt="Leader Image"
          class="pointer-events-none w-full sm:scale-100 md:scale-125"
        />
      </div>
    </template>

    <template #add-unit-button>
      <button class="font-body btn btn-primary btn-outline" @click="modal.open()">
        ⟐ Initiate Warp Protocol
      </button>
    </template>
  </RacePage>
</template>

<style scoped></style>
