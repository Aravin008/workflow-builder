<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'

defineProps<NodeProps>()
</script>

<template>
  <div class="px-4 py-2 rounded border bg-blue-100 min-w-37.5 text-center">
    <strong>Transform</strong>

    <!-- Incoming -->
    <Handle
      type="target"
      :position="Position.Top"
    />

    <!-- Outgoing -->
    <Handle
      type="source"
      :position="Position.Bottom"
    />
  </div>
</template>
