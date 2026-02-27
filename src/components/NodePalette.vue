<script setup lang="ts">
import { useFlowStore } from '@/stores/flowStore'
import ExportFile from './ExportFile.vue';
import ImportFile from './ImportFile.vue';

const flow = useFlowStore()

function onDragStart(event: DragEvent, type: string) {
  event.dataTransfer?.setData('application/vueflow', type)
  event.dataTransfer!.effectAllowed = 'move'
}
</script>

<template>
  <div class="h-screen flex flex-col border-r justify-between">
    <div class="p-4 space-y-2">
      <h2 class="font-bold text-center">Nodes</h2>

      <div class="border p-2 bg-green-100 cursor-pointer text-center rounded"
          @click="flow.addNode('start', 'Start Node', null)"
          draggable="true"
          @dragstart="onDragStart($event, 'start')"
      >
        Start Node
      </div>

      <div class="border p-2 bg-blue-100 cursor-pointer text-center rounded"
          @click="flow.addNode('transform', 'Transform Node', null)"
          draggable="true"
          @dragstart="onDragStart($event, 'transform')"
      >
        Transform Node
      </div>

      <div class="border p-2 bg-yellow-100 cursor-pointer text-center rounded"
          @click="flow.addNode('condition', 'If / Else Node', null)"
          draggable="true"
          @dragstart="onDragStart($event, 'condition')"
      >
        If / Else Node
      </div>

      <div class="border bg-red-100 p-2 cursor-pointer text-center rounded"
          @click="flow.addNode('end', 'End Node', null)"
          draggable="true"
          @dragstart="onDragStart($event, 'end')"
      >
        End Node
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
