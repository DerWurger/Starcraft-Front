import { ref } from 'vue'

type Toast = {
  id: number
  messages: string[]
  type: 'info' | 'error' | 'success'
}

const toasts = ref<Toast[]>([])
let counter = 0

export function useToastSingleton() {
  function show(messages: string[], type: Toast['type'] = 'info', timeout = 6000) {
    const id = counter++
    toasts.value.push({ id, messages, type })

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, timeout)
  }

  return { toasts, show }
}
