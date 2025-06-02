<script setup lang="ts">
import { toast } from '@/composables/toast'
import { onMounted, watch } from 'vue'

const { toasts } = toast

watch(toasts, () => {
  console.log(toasts.value)
})
</script>

<template>
  <div class="toast toast-center w-fit min-w-96">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="font-body alert w-fit text-sm shadow-lg"
      :class="{
        'alert-info': toast.type === 'info',
        'alert-error': toast.type === 'error',
        'alert-success': toast.type === 'success'
      }"
    >
      <ul class="list-disc pl-5 leading-relaxed">
        <li v-for="(line, index) in toast.messages" :key="index">{{ line }}</li>
      </ul>
    </div>
  </div>
</template>
