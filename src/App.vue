<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { Race } from '@/types/race.enum.ts'
import { useCreateUnitModal } from '@/stores/useCreateUnitModal.store.ts'
import CreateUnitModal from '@/components/CreateUnitModal.vue'
import ToastList from '@/components/ToastList.vue'

const route = useRoute()

const modal = useCreateUnitModal()
</script>

<template>
  <CreateUnitModal v-show="modal.isOpen" @close="modal.close()" />
  <div class="font-body h-full w-full">
    <header class="p-6">
      <h2 class="font-heading text-4xl uppercase tracking-widest">StarCraft II</h2>
      <div class="tabs">
        <RouterLink
          :to="`/${Race.TERRAN}`"
          class="tab tab-lifted text-2xl sm:text-lg lg:text-3xl"
          :class="{ 'tab-active': route.name === Race.TERRAN }"
          >Terrans</RouterLink
        >
        <RouterLink
          :to="`/${Race.ZERG}`"
          class="tab tab-lifted text-2xl sm:text-lg lg:text-3xl"
          :class="{ 'tab-active': route.name === Race.ZERG }"
          >Zergs</RouterLink
        >
        <RouterLink
          :to="`/${Race.PROTOSS}`"
          class="tab tab-lifted text-2xl sm:text-lg lg:text-3xl"
          :class="{ 'tab-active': route.name === Race.PROTOSS }"
          >Protosses</RouterLink
        >
      </div>
    </header>
    <RouterView />
    <ToastList />
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
}
</style>
