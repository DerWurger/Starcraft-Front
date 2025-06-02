<script setup lang="ts">
import { Race } from '@/types/race.enum'

defineProps<{
  race: Race
  onDelete: () => void
}>()
</script>

<template>
  <div v-if="race === Race.ZERG" class="absolute bottom-2 right-2 z-10">
    <div
      class="font-heading cursor-pointer !text-xl text-accent transition-transform hover:scale-110 hover:text-primary"
      @click="onDelete"
      title="Sacrifice"
    >
      Sacrifice
    </div>
  </div>

  <div
    v-else-if="race === Race.PROTOSS"
    class="group absolute right-2 top-2 z-10 cursor-pointer"
    @click="onDelete"
  >
    <div
      class="font-heading animate-[pulse-glow_1.5s_infinite] text-base tracking-widest text-primary transition-transform group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_#ffe766]"
      title="Purge"
    >
      PURGE
    </div>
  </div>

  <div
    v-else
    class="font-heading absolute right-2 top-2 z-10 cursor-pointer !text-sm tracking-wider text-error transition hover:scale-105"
    @click="onDelete"
    title="Dismiss unit"
  >
    [DISMISS]
  </div>
</template>

<style>
@keyframes pulse-glow {
  0% {
    text-shadow: 0 0 0 hsl(var(--p));
  }
  50% {
    text-shadow: 0 0 8px hsl(var(--p));
  }
  100% {
    text-shadow: 0 0 0 hsl(var(--p));
  }
}
</style>
