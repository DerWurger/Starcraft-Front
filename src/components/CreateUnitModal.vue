<script setup lang="ts">
import { useUnitStore } from '@/stores/units.store.ts'
import { useCreateUnitModal } from '@/stores/useCreateUnitModal.store.ts'
import { ref, watch } from 'vue'

const unitStore = useUnitStore()
const modalActions = useCreateUnitModal()

const dialogRef = ref<HTMLDialogElement | null>(null)

watch(
  () => modalActions.isOpen,
  (isOpen) => {
    if (isOpen) {
      setTimeout(() => dialogRef.value?.showModal(), 0)
    } else {
      dialogRef.value?.close()
    }
  }
)

function closeModal() {
  modalActions.close()
}

const name = ref('')
const description = ref('')
const file = ref<File | null>(null)

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    file.value = target.files[0]
  }
}

async function submit() {
  if (!name.value || !description.value || !file.value || !unitStore.currentRaceId) {
    console.log(name.value, description.value, file.value, unitStore.currentRaceId)
    alert('Please fill out all fields and select a file.')
    return
  }

  const formData = new FormData()
  formData.append('raceId', unitStore.currentRaceId as unknown as string)
  formData.append('name', name.value)
  formData.append('description', description.value)
  formData.append('image', file.value)

  try {
    await unitStore.addUnit(formData)
    closeModal()
    name.value = ''
    description.value = ''
    file.value = null
  } catch (err) {
    console.error('Failed to submit:', err)
  }
}
</script>

<template>
  <dialog ref="dialogRef" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <!-- heading -->
      <h3 class="text-lg font-bold">
        Creating new
        <b class="font-heading text-primary">{{ unitStore.currentRace }} </b>!
      </h3>

      <!-- name of new unit -->
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">How would we name it?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
          v-model.trim="name"
        />
      </div>

      <!-- description of unit -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">What's the story of that new {{ unitStore.currentRace }}?</span>
        </label>
        <textarea
          class="textarea textarea-bordered h-24"
          placeholder="Bio"
          v-model.trim="description"
        ></textarea>
      </div>

      <!-- input image -->
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">How does it look like?</span>
        </label>
        <input
          type="file"
          class="file-input file-input-bordered file-input-primary w-full max-w-xs"
          @change="onFileChange"
        />
      </div>

      <!-- actions -->
      <div class="modal-action flex justify-between">
        <button class="btn btn-primary" @click="submit">Submit</button>
        <button class="btn" @click="closeModal">Close</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped></style>
