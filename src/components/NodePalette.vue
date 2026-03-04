<script setup lang="ts">
import { useFlowStore } from '@/stores/flowStore'
import ExportFile from './ExportFile.vue';
import ImportFile from './ImportFile.vue';
import { nodeRegistry } from '@/workflow/core/node-registry';

const flow = useFlowStore()
const availableNodes = nodeRegistry.getAll();

function onDragStart(event: DragEvent, type: string) {
  event.dataTransfer?.setData('application/vueflow', type)
  event.dataTransfer!.effectAllowed = 'move'
}
</script>

<template>
  <div class="h-screen flex flex-col border-r justify-between">
    <div class="p-4 space-y-2">
      <h2 class="font-bold text-center">Nodes</h2>

      <div 
        v-for="node in availableNodes"
        :key="node.type"
        @click="flow.addNode(node.type,  null)"
        class="border p-2 cursor-pointer text-center rounded"
        :class="node.color"
        draggable="true"
        @dragstart="onDragStart($event, node.type)"
      >
        {{ node.label }}
      </div>
    </div>
    <div class="py-2 px-4 space-y-2">
      <div class="flex justify-between space-y-2">
        <button class="border rounded min-w-24 h-10 bg-blue-800 text-white disabled:bg-gray-600 cursor-pointer disabled:cursor-not-allowed" @click="flow.undo" :disabled="!flow.canUndo">Undo</button>
        <button class="border rounded min-w-24 h-10 bg-blue-800 text-white disabled:bg-gray-600 cursor-pointer disabled:cursor-not-allowed" @click="flow.redo" :disabled="!flow.canRedo">Redo</button>
      </div>
      <div class="w-50">
        <div class="border p-2 bg-red-800 text-white rounded cursor-pointer text-center font-bold"
          @click="flow.clearCanvas()">
          Clear Canvas
        </div>
      </div>
      <div class="flex flex-col justify-between space-y-2">
        <ExportFile />
        <ImportFile />
      </div>
    </div>
  </div>
</template>
