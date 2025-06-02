<!--<script setup lang="ts">-->
<!--import { computed, onMounted, ref, watch } from 'vue'-->
<!--import { Race } from '@/types/race.enum.ts'-->
<!--import { useLeader } from '@/composables/api/useLeader.ts'-->
<!--import UnitCard from '@/components/UnitCard.vue'-->
<!--import { useUnitStore } from '@/stores/units.store.ts'-->
<!--import type { Unit } from '@/types/unit.i.ts'-->
<!--import { getImageUrl } from '@/utils/url.utils.ts'-->
<!--import { useCreateUnitModal } from '@/stores/useCreateUnitModal.store.ts'-->

<!--const { leader } = useLeader(Race.ZERG)-->

<!--const unitStore = useUnitStore()-->

<!--const sortMode = ref<'original' | 'asc' | 'desc'>('original')-->

<!--const originalUnits = ref<Unit[]>([])-->

<!--const modal = useCreateUnitModal()-->

<!--const sortedUnits = computed(() => {-->
<!--  if (sortMode.value === 'original') {-->
<!--    return originalUnits.value-->
<!--  }-->

<!--  return originalUnits.value.slice().sort((a, b) => {-->
<!--    return sortMode.value === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)-->
<!--  })-->
<!--})-->

<!--const showSpikes = ref(true)-->

<!--watch(leader, (newLeader) => {-->
<!--  if (newLeader) {-->
<!--    showSpikes.value = true-->
<!--    setTimeout(() => {-->
<!--      showSpikes.value = false-->
<!--    }, 1000)-->
<!--  }-->
<!--})-->

<!--onMounted(async () => {-->
<!--  await unitStore.setRace(Race.ZERG)-->
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
<!--      <div class="justify-left absolute bottom-[-90%] flex gap-4">-->
<!--        <button class="btn btn-primary btn-outline" @click="sortMode = 'original'">Original</button>-->
<!--        <button class="btn btn-primary btn-outline" @click="sortMode = 'asc'">A → Z</button>-->
<!--        <button class="btn btn-primary btn-outline" @click="sortMode = 'desc'">Z → A</button>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; leader image &ndash;&gt;-->
<!--    <div class="relative max-w-sm flex-1">-->
<!--      <img-->
<!--        :src="getImageUrl(leader.image)"-->
<!--        alt="Leader Image"-->
<!--        class="image-darker pointer-events-none w-full translate-x-[-2rem] scale-125 object-cover"-->
<!--      />-->

<!--      <transition name="spike-slide" :duration="{ enter: 0, leave: 2000 }">-->
<!--        <div-->
<!--          v-if="showSpikes"-->
<!--          class="clip-spikes absolute bottom-0 h-full w-full bg-base-100"-->
<!--        ></div>-->
<!--      </transition>-->
<!--    </div>-->
<!--  </section>-->

<!--  <transition-group-->
<!--    name="zerg"-->
<!--    tag="section"-->
<!--    class="mt-[-1rem] flex flex-wrap justify-center gap-8"-->
<!--  >-->
<!--    <div v-for="unit in sortedUnits" :key="unit.id">-->
<!--      <UnitCard :unit="unit" image-position="bottom" />-->
<!--    </div>-->
<!--  </transition-group>-->

<!--  <div class="flex justify-end p-16">-->
<!--    <button-->
<!--      class="font-body flex h-fit w-fit cursor-pointer items-center justify-center p-2 text-primary hover:text-accent"-->
<!--      @click="modal.open()"-->
<!--    >-->
<!--      Add more <b class="font-heading"> Monsters </b>-->
<!--    </button>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.zerg-enter-from {-->
<!--  opacity: 0;-->
<!--  transform: scale(1.3) translateY(-25%);-->
<!--  filter: grayscale(1) blur(8px);-->
<!--}-->

<!--.zerg-enter-to {-->
<!--  opacity: 1;-->
<!--  transform: scale(1) translateY(0);-->
<!--  filter: grayscale(0) blur(0);-->
<!--}-->

<!--.zerg-enter-active {-->
<!--  transition: all 0.8s ease-in-out;-->
<!--}-->

<!--.zerg-move {-->
<!--  transition: transform 1500ms cubic-bezier(0.25, 1.8, 0.5, 1);-->
<!--}-->

<!--.zerg-leave-from {-->
<!--  opacity: 1;-->
<!--  transform: scale(1);-->
<!--  filter: grayscale(0) blur(0);-->
<!--}-->

<!--.zerg-leave-to {-->
<!--  opacity: 0;-->
<!--  transform: scale(0.5);-->
<!--  filter: grayscale(1) blur(6px);-->
<!--}-->

<!--.zerg-leave-active {-->
<!--  transition: all 400ms ease-in-out;-->
<!--}-->

<!--.image-darker {-->
<!--  filter: brightness(80%) contrast(105%);-->
<!--}-->

<!--.clip-spikes {-->
<!--  clip-path: polygon(-->
<!--    0% 20%,-->
<!--    5% 0%,-->
<!--    10% 20%,-->
<!--    15% 0%,-->
<!--    20% 20%,-->
<!--    25% 0%,-->
<!--    30% 20%,-->
<!--    35% 0%,-->
<!--    40% 20%,-->
<!--    45% 0%,-->
<!--    50% 20%,-->
<!--    55% 0%,-->
<!--    60% 20%,-->
<!--    65% 0%,-->
<!--    70% 20%,-->
<!--    75% 0%,-->
<!--    80% 20%,-->
<!--    85% 0%,-->
<!--    90% 20%,-->
<!--    95% 0%,-->
<!--    100% 20%,-->
<!--    100% 100%,-->
<!--    0% 100%-->
<!--  );-->
<!--  position: absolute;-->
<!--  inset: 0;-->
<!--  height: 150%;-->
<!--  width: 150%;-->
<!--  left: -25%;-->
<!--}-->

<!--.spike-slide-leave-from {-->
<!--  transform: translateY(0);-->
<!--}-->

<!--.spike-slide-leave-to {-->
<!--  transform: translateY(100%);-->
<!--}-->

<!--.spike-slide-leave-active {-->
<!--  transition: transform 2000ms linear;-->
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
  <RacePage :race="Race.ZERG" transitionName="zerg" :spikesEnabled="true">
    <template #leader-image="{ leader, showSpikes }">
      <div class="relative max-w-sm flex-1">
        <img
          :src="getImageUrl(leader.image)"
          alt="Leader Image"
          class="image-darker pointer-events-none w-full translate-x-[-2rem] scale-125 object-cover"
        />
        <transition name="spike-slide" :duration="{ enter: 0, leave: 2000 }">
          <div
            v-if="showSpikes"
            class="clip-spikes absolute bottom-0 h-full w-full bg-base-100"
          ></div>
        </transition>
      </div>
    </template>

    <template #add-unit-button>
      <button
        class="font-body flex h-fit w-fit cursor-pointer items-center justify-center p-2 text-primary hover:text-accent"
        @click="modal.open()"
      >
        Add more <b class="font-heading ml-1"> Monsters </b>
      </button>
    </template>
  </RacePage>
</template>

<style scoped>
.image-darker {
  filter: brightness(80%) contrast(105%);
}
.clip-spikes {
  clip-path: polygon(
    0% 20%,
    5% 0%,
    10% 20%,
    15% 0%,
    20% 20%,
    25% 0%,
    30% 20%,
    35% 0%,
    40% 20%,
    45% 0%,
    50% 20%,
    55% 0%,
    60% 20%,
    65% 0%,
    70% 20%,
    75% 0%,
    80% 20%,
    85% 0%,
    90% 20%,
    95% 0%,
    100% 20%,
    100% 100%,
    0% 100%
  );
  position: absolute;
  inset: 0;
  height: 150%;
  width: 150%;
  left: -25%;
}

.spike-slide-leave-from {
  transform: translateY(0);
}

.spike-slide-leave-to {
  transform: translateY(100%);
}

.spike-slide-leave-active {
  transition: transform 2000ms linear;
}
</style>
