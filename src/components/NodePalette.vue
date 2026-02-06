<script setup>
import { useFlowStore } from '@/stores/flowStore'

const flow = useFlowStore()
</script>

<template>
  <div class="w-60 border-r p-4 space-y-2">
    <h2 class="font-bold">Nodes</h2>

    <div class="border p-2 cursor-pointer"
        @click="flow.addNode('start', 'Start Node')">
      Start Node
    </div>

    <div class="border p-2 cursor-pointer"
        @click="flow.addNode('transform', 'Transform Node')">
      Transform Node
    </div>

    <div class="border p-2 cursor-pointer"
        @click="flow.addNode('condition', 'If / Else Node')">
      If / Else Node
    </div>

    <div class="border p-2 cursor-pointer"
        @click="flow.addNode('end', 'End Node')">
      End Node
    </div>
  </div>
</template>
