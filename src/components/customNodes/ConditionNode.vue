<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <div class="relative bg-yellow-100 border rounded p-2 min-w-37.5">
    <div class="text-center pb-1"><strong>Condition</strong></div>

    <!-- Incoming -->
    <Handle
      type="target"
      :position="Position.Top"
    />

    <!-- True branch -->
    <div class="absolute -left-1.25 -rotate-z-90 top-1/2 -translate-y-1/2 text-xs text-green-700 pointer-events-none">
      True
    </div>
    <Handle
      id="left"
      type="source"
      :position="Position.Left"
    />

    <!-- False branch -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-red-700 pointer-events-none">
      False
    </div>
    <Handle
      id="bottom"
      type="source"
      :position="Position.Bottom"
      class="left-[50%]"
    />
  </div>
</template>
