<script setup lang="ts">
import { useFlowStore } from '@/stores/flowStore'

const flow = useFlowStore()

function onImportFile(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  const reader = new FileReader()

  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result as string)
      flow.importFlow(json)
    } catch {
      alert('Invalid JSON file')
    }
  }

  reader.readAsText(file)
  input.value = ''
}
</script>

<template>
  <label class="border p-2 rounded cursor-pointer text-center">
    📥 Import
    <input
      type="file"
      accept="application/json"
      hidden
      @change="onImportFile"
    />
  </label>
</template>
