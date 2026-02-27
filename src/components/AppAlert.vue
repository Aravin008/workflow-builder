<script setup lang="ts">
import { useAlertStore } from '@/stores/alertStore'

console.log("alert store access")
const alert = useAlertStore()
</script>

<template>
  <transition name="fade">
    <div
      v-if="alert.isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div class="bg-white w-96 rounded shadow-lg p-4">
        <h3
          class="font-semibold mb-2"
          :class="{
            'text-red-600': alert.type === 'error',
            'text-yellow-600': alert.type === 'warning',
            'text-blue-600': alert.type === 'info',
          }"
        >
          {{ alert.type.toUpperCase() }}
        </h3>

        <p class="text-sm text-gray-700">
          {{ alert.message }}
        </p>

        <div class="mt-4 flex justify-end">
          <button
            class="px-4 py-1 bg-black text-white rounded"
            @click="alert.close"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
