<!--<script setup lang="ts">-->
<!--import { computed, onMounted, ref } from 'vue'-->
<!--import { useRaceTheme } from '@/composables/useRaceTheme'-->
<!--import { Race } from '@/types/race.enum.ts'-->
<!--import { useLeader } from '@/composables/api/useLeader.ts'-->
<!--import UnitCard from '@/components/UnitCard.vue'-->
<!--import { useUnitStore } from '@/stores/units.store.ts'-->
<!--import type { Unit } from '@/types/unit.i.ts'-->
<!--import { addBase64Prefix } from '@/utils/formatBase64.utils.ts'-->
<!--import { getImageUrl } from '@/utils/url.utils.ts'-->

<!--const { leader } = useLeader(Race.TERRAN)-->

<!--const unitStore = useUnitStore()-->

<!--const sortMode = ref<'original' | 'asc' | 'desc'>('original')-->
<!--const originalUnits = ref<Unit[]>([])-->

<!--const sortedUnits = computed(() => {-->
<!--  if (sortMode.value === 'original') {-->
<!--    return originalUnits.value-->
<!--  }-->

<!--  return originalUnits.value.slice().sort((a, b) => {-->
<!--    return sortMode.value === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)-->
<!--  })-->
<!--})-->

<!--onMounted(async () => {-->
<!--  await unitStore.setRace(Race.TERRAN)-->
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
<!--      <div class="absolute bottom-[-90%] left-0 flex justify-center gap-4">-->
<!--        <button class="btn btn-primary btn-outline" @click="sortMode = 'original'">Original</button>-->
<!--        <button class="btn btn-primary btn-outline" @click="sortMode = 'asc'">A → Z</button>-->
<!--        <button class="btn btn-primary btn-outline" @click="sortMode = 'desc'">Z → A</button>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; leader image &ndash;&gt;-->
<!--    <div class="max-w-sm flex-1">-->
<!--      <img-->
<!--        :src="getImageUrl(leader.image)"-->
<!--        alt="Leader Image"-->
<!--        class="pointer-events-none w-full object-cover"-->
<!--      />-->
<!--    </div>-->
<!--  </section>-->

<!--  <transition-group-->
<!--    name="terran"-->
<!--    tag="section"-->
<!--    class="mt-[-2rem] flex flex-wrap justify-center gap-8"-->
<!--  >-->
<!--    <div v-for="unit in sortedUnits" :key="unit.id" class="terran-card-wrapper">-->
<!--      <UnitCard :unit="unit" image-position="bottom" />-->
<!--    </div>-->
<!--  </transition-group>-->

<!--  &lt;!&ndash;  <section class="mt-[-1.5rem] flex flex-row flex-wrap justify-center gap-4 bg-[&#45;&#45;card-bg] p-2">&ndash;&gt;-->
<!--  &lt;!&ndash;    <UnitCard v-for="unit in units" :key="unit.name" :unit="unit" :image-position="'bottom'" />&ndash;&gt;-->
<!--  &lt;!&ndash;  </section>&ndash;&gt;-->
<!--</template>-->

<!--<style scoped>-->
<!--.terran-enter-from {-->
<!--  opacity: 0;-->
<!--  transform: translateY(-50%) scale(0.9);-->
<!--  filter: blur(4px) brightness(1.2);-->
<!--}-->

<!--.terran-enter-active {-->
<!--  transition: all 600ms cubic-bezier(0.2, 0.8, 0.3, 1.5);-->
<!--}-->
<!--.terran-move {-->
<!--  transition: transform 600ms ease;-->
<!--}-->

<!--.terran-enter-to {-->
<!--  opacity: 1;-->
<!--  transform: translateY(0) scale(1);-->
<!--  filter: blur(0) brightness(1);-->
<!--}-->

<!--.terran-leave-from {-->
<!--  opacity: 1;-->
<!--  transform: translateX(0);-->
<!--  filter: none;-->
<!--}-->

<!--.terran-leave-active {-->
<!--  transition: all 600ms ease-in;-->
<!--}-->

<!--.terran-leave-to {-->
<!--  opacity: 0;-->
<!--  transform: translateX(-150%) scale(0.9);-->
<!--  filter: blur(4px) grayscale(1);-->
<!--}-->
<!--</style>-->

<script setup lang="ts">
import RacePage from './RacePage.vue'
import { Race } from '@/types/race.enum.ts'
import { useCreateUnitModal } from '@/stores/useCreateUnitModal.store.ts'

const modal = useCreateUnitModal()
</script>

<template>
  <RacePage :race="Race.TERRAN" transition-name="terran">
    <template #add-unit-button>
      <button
        class="btn border border-primary font-mono text-primary-content hover:text-accent-content"
        @click="modal.open()"
      >
        [ INITIATE_REINFORCEMENT.exe ]
      </button>
    </template>
  </RacePage>
</template>
