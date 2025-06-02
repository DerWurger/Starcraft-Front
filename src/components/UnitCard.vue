<script setup lang="ts">
import type { Unit } from '@/types/unit.i.ts'
import { getImageUrl } from '@/utils/url.utils.ts'
import { onMounted } from 'vue'

export type ImagePosition = 'top' | 'bottom'

const props = defineProps<{
  unit: Unit
  imagePosition?: ImagePosition
}>()
</script>

<template>
  <div
    class="card relative flex h-full w-96 bg-[--card-bg] shadow-xl"
    :class="{
      'flex-col': props.imagePosition === 'top',
      'flex-col-reverse': props.imagePosition === 'bottom'
    }"
  >
    <slot name="delete" :unit="props.unit" />

    <figure class="h-[480px]">
      <img :src="getImageUrl(props.unit.image)" :alt="props.unit.name" class="h-full w-full" />
    </figure>

    <div class="card-body">
      <h2 class="font-heading card-title min-h-24 text-primary">
        {{ props.unit.name }}
      </h2>
      <p class="font-body text-base text-base-content">
        {{ props.unit.description }}
      </p>
    </div>
  </div>
</template>
