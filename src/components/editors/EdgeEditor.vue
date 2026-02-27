<script setup lang="ts">
import { Edge } from '@/types/workflow';

defineProps<{
  edge: Edge
}>()
</script>

<template>
  <div class="space-y-2 text-sm">
    <div><strong>ID:</strong> {{ edge.id }}</div>
    <div><strong>Source:</strong> {{ edge.source }}</div>
    <div><strong>Target:</strong> {{ edge.target }}</div>

    <div v-if="edge.branch">
      <strong>Branch:</strong> {{ edge.branch }}
    </div>
  </div>
</template>
