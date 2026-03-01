<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

const props = defineProps<{
  data: {
    isActive?: boolean
    isCompleted?: boolean
  }
}>()
</script>

<template>
  <div
    class="px-4 py-2 bg-red-100 min-w-37.5 text-center border rounded"
    :class="[
      props.data.isActive && 'ring-2 ring-blue-500 bg-blue-100',
      props.data.isCompleted && 'bg-gray-200'
    ]"
  >
    <strong>End</strong>
    <Handle type="target" :position="Position.Top" />
  </div>
</template>
