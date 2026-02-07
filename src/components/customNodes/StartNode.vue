<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <div class="px-4 py-2 bg-green-100 min-w-37.5 text-center border rounded">
    <strong>Start</strong>

    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
