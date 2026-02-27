<script setup lang="ts">
import { useFlowStore } from '@/stores/flowStore'

const flow = useFlowStore()

function exportJson() {
  const data = flow.exportFlow()
  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: 'application/json' }
  )

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'workflow.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <button
    class="border p-2 rounded text-center cursor-pointer"
    @click="exportJson"
  >
    📤 Export
  </button>
</template>
