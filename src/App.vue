<script setup>
import NodePalette from '@/components/NodePalette.vue'
import '@vue-flow/core/dist/style.css'
import NodeInspector from '@/components/NodeInspector.vue';
import FlowCanvas from './components/FlowCanvas.vue';
import { useFlowStore } from './stores/flowStore';

const flow = useFlowStore()
console.log("selected", flow.selectedNode)
</script>

<template>
  <div class="h-screen flex">
    <NodePalette />
    
    <div class="flex-1">
      <FlowCanvas />
    </div>
    
    <NodeInspector
      v-if="flow.selectedNode" 
      :key="flow.selectedNode?.id"
    />
  </div>
</template>
