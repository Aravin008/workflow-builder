<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <div class="bg-yellow-100 border rounded p-2 min-w-37.5">
    <div class="text-center"><strong>Condition</strong></div>

    <!-- Incoming -->
    <Handle
      type="target"
      :position="Position.Top"
    />

    <!-- True branch -->
    <Handle
      id="left"
      type="source"
      :position="Position.Left"
    />

    <!-- False branch -->
    <Handle
      id="bottom"
      type="source"
      :position="Position.Bottom"
      class="left-[50%]"
    />
  </div>
</template>
