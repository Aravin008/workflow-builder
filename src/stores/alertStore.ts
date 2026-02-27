// src/stores/alertStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type AlertType = 'error' | 'warning' | 'info'

export const useAlertStore = defineStore('alert', () => {
  const isOpen = ref(false)
  const message = ref('')
  const type = ref<AlertType>('info')

  function show(msg: string, t: AlertType = 'info') {
    message.value = msg
    type.value = t
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  console.log("alert store init")
  return {
    isOpen,
    message,
    type,
    show,
    close,
  }
})
