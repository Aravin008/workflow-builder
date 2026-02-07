<script setup lang="ts">
import { useFlowStore } from '@/stores/flowStore'

const flow = useFlowStore()

function onDragStart(event: DragEvent, type: string) {
  event.dataTransfer?.setData('application/vueflow', type)
  event.dataTransfer!.effectAllowed = 'move'
}
</script>

<template>
  <div class="h-screen flex flex-col border-r">
    <div class="w-50 p-4 space-y-2">
      <h2 class="font-bold text-center">Nodes</h2>

      <div class="border p-2 cursor-pointer text-center rounded"
          @click="flow.addNode('start', 'Start Node')"
          draggable="true"
          @dragstart="onDragStart($event, 'start')"
      >
        Start Node
      </div>

      <div class="border p-2 cursor-pointer text-center rounded"
          @click="flow.addNode('transform', 'Transform Node')"
          draggable="true"
          @dragstart="onDragStart($event, 'transform')"
      >
        Transform Node
      </div>

      <div class="border p-2 cursor-pointer text-center rounded"
          @click="flow.addNode('condition', 'If / Else Node')"
          draggable="true"
          @dragstart="onDragStart($event, 'condition')"
      >
        If / Else Node
      </div>

      <div class="border p-2 cursor-pointer text-center rounded"
          @click="flow.addNode('end', 'End Node')"
          draggable="true"
          @dragstart="onDragStart($event, 'end')"
      >
        End Node
      </div>
    </div>
    <div class="w-50 p-4 space-y-2">
      <div class="border p-2 bg-red-800 text-white rounded cursor-pointer text-center"
        @click="flow.clearCanvas()">
        Clear Canvas
      </div>
    </div>
  </div>
</template>
