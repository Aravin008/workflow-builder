<script setup>
import { useFlowStore } from '@/stores/flowStore'

const flow = useFlowStore()
const node = flow.selectedNode
</script>

<template>
  <div class="w-72 border-l p-4">
    <div @click="flow.selectNode(null)" class="bg-black px-2 py-1 cursor-pointer text-white absolute right-1 top-1 border rounded">Close</div>
    <div v-if="!node">Select a node</div>

    <div v-else>
      <h3 class="font-bold mb-2">{{ node.data.label }}</h3>

      <!-- Start Node -->
      <div v-if="node.type === 'start'">
        <p class="text-sm text-gray-600">No config needed</p>
      </div>

      <!-- Transform Node -->
      <div v-if="node.type === 'transform'">
        <label class="block text-sm">Expression</label>
        <input
          class="border p-1 w-full"
          @input="flow.updateNodeData(node.id, { expression: $event.target.value })"
        />
      </div>

      <!-- Condition Node -->
      <div v-if="node.type === 'condition'">
        <label class="block text-sm">Condition</label>
        <input
          class="border p-1 w-full"
          @input="flow.updateNodeData(node.id, { condition: $event.target.value })"
        />
      </div>
    </div>
  </div>
</template>
