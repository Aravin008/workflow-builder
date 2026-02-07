<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <div class="bg-yellow-100 border rounded p-2 text-sm">
    <div class="font-bold mb-1">Condition</div>

    <!-- Incoming -->
    <Handle
      type="target"
      :position="Position.Top"
    />

    <!-- True branch -->
    <Handle
      id="top"
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
