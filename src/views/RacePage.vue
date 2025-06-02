<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useUnitStore } from '@/stores/units.store.ts'
import UnitCard from '@/components/UnitCard.vue'
import type { Race } from '@/types/race.enum.ts'
import { useCreateUnitModal } from '@/stores/useCreateUnitModal.store.ts'
import { useLeader } from '@/composables/api/useLeader.ts'
import { getImageUrl } from '@/utils/url.utils.ts'
import type { Unit } from '@/types/unit.i.ts'
import UnitDeleteSlot from '@/components/UnitDeleteSlot.vue'

interface Props {
  race: Race
  transitionName: string
  spikesEnabled?: boolean
  unitImagePosition?: 'top' | 'bottom'
}

const props = defineProps<Props>()

const unitStore = useUnitStore()

const sortMode = ref<'original' | 'asc' | 'desc'>('original')

const sortedUnits = computed(() => {
  const base = [...originalUnits.value]

  if (sortMode.value === 'original') return base
  return base.sort((a, b) =>
    sortMode.value === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  )
})

const { leader } = useLeader(props.race)
const showSpikes = ref(true)

watch(leader, (newLeader) => {
  if (newLeader && props.spikesEnabled) {
    showSpikes.value = true
    setTimeout(() => {
      showSpikes.value = false
    }, 1000)
  }
})

const originalUnits = ref<Unit[]>([])

watch(
  () => props.race,
  async () => {
    originalUnits.value = []
    await unitStore.setRace(props.race)
    originalUnits.value = [...unitStore.unitList] // ← ключ
  },
  { immediate: true }
)

watch(
  () => unitStore.unitList,
  (newUnits) => {
    originalUnits.value = [...newUnits]
  }
)

const modal = useCreateUnitModal()
</script>

<template>
  <section v-if="leader" class="flex items-center gap-8 rounded-xl p-6 lg:justify-center">
    <!-- about leader section -->
    <div class="relative flex-1 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
      <h2 class="font-heading text-3xl uppercase tracking-widest text-primary md:text-5xl">
        {{ leader.name }}
      </h2>
      <p class="mt-4 text-lg leading-relaxed text-base-content">
        {{ leader.description }}
      </p>
      <a
        :href="leader.wiki"
        target="_blank"
        rel="noopener"
        class="mt-4 inline-block text-primary underline transition hover:text-accent"
      >
        Learn more on StarCraft Wiki →
      </a>

      <div class="absolute bottom-[-90%] left-0 flex justify-center gap-4">
        <button class="btn btn-primary btn-outline" @click="sortMode = 'original'">Original</button>
        <button class="btn btn-primary btn-outline" @click="sortMode = 'asc'">A → Z</button>
        <button class="btn btn-primary btn-outline" @click="sortMode = 'desc'">Z → A</button>
      </div>
    </div>

    <!-- get slot for specific markup -->
    <slot name="leader-image" :leader="leader" :showSpikes="showSpikes">
      <div class="max-w-sm flex-1">
        <img
          :src="getImageUrl(leader.image)"
          alt="Leader Image"
          class="pointer-events-none w-full object-cover"
        />
      </div>
    </slot>
  </section>

  <!-- Unit cards -->
  <transition-group
    :name="transitionName"
    tag="section"
    class="mt-[-2rem] flex flex-wrap justify-center gap-8"
  >
    <div v-for="unit in sortedUnits" :key="unit.id">
      <UnitCard :unit="unit" :image-position="props.unitImagePosition ?? 'bottom'">
        <template #delete="{ unit }">
          <UnitDeleteSlot
            :unit="unit"
            :on-delete="() => unitStore.removeUnit(unit.id)"
            :race="props.race"
          />
        </template>
      </UnitCard>
    </div>
  </transition-group>

  <div class="flex justify-end p-16" v-if="leader">
    <!-- Add unit button slot -->
    <slot name="add-unit-button">
      <button class="btn btn-primary btn-outline" @click="modal.open()">Add new unit</button>
    </slot>
  </div>
</template>

<style scoped>
.zerg-enter-from {
  opacity: 0;
  transform: scale(1.3) translateY(-25%);
  filter: grayscale(1) blur(8px);
}

.zerg-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
  filter: grayscale(0) blur(0);
}

.zerg-enter-active {
  transition: all 0.8s ease-in-out;
}

.zerg-move {
  transition: transform 1500ms cubic-bezier(0.25, 1.8, 0.5, 1);
}

.zerg-leave-from {
  opacity: 1;
  transform: scale(1);
  filter: grayscale(0) blur(0);
}

.zerg-leave-to {
  opacity: 0;
  transform: scale(0.5);
  filter: grayscale(1) blur(6px);
}

.zerg-leave-active {
  transition: all 400ms ease-in-out;
}

.terran-enter-from {
  opacity: 0;
  transform: translateY(-50%) scale(0.9);
  filter: blur(4px) brightness(1.2);
}

.terran-enter-active {
  transition: all 600ms cubic-bezier(0.2, 0.8, 0.3, 1.5);
}
.terran-move {
  transition: transform 600ms ease;
}

.terran-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0) brightness(1);
}

.terran-leave-from {
  opacity: 1;
  transform: translateX(0);
  filter: none;
}

.terran-leave-active {
  transition: all 600ms ease-in;
}

.terran-leave-to {
  opacity: 0;
  transform: translateX(-150%) scale(0.9);
  filter: blur(4px) grayscale(1);
}

.protoss-enter-from {
  box-shadow: 0 0 128px 64px color-mix(in srgb, hsl(var(--s)) 30%, hsl(var(--p)));
  transform: translateY(-100%);
  filter: blur(24px) brightness(2);
  opacity: 0;
}

.protoss-enter-active {
  transition: all 1000ms ease-in-out;
}

.protoss-enter-to {
  box-shadow: none;
  background-color: transparent;
  transform: translateY(0);
  filter: none;
  opacity: 1;
}

.protoss-move {
  transition: transform 400ms ease;
}

.protoss-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: none;
  box-shadow: none;
}

.protoss-leave-active {
  transition: all 1000ms ease-in-out;
}

.protoss-leave-to {
  opacity: 0;
  transform: translateY(-100%) scale(0.1);
  filter: blur(24px) brightness(2);
  box-shadow: 0 0 128px 64px hsl(var(--s));
}
</style>
