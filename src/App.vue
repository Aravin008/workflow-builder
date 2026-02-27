<script setup>
import NodePalette from '@/components/NodePalette.vue'
import '@vue-flow/core/dist/style.css'
import NodeInspector from '@/components/NodeInspector.vue';
import FlowCanvas from './components/FlowCanvas.vue';
import { useFlowStore } from './stores/flowStore';
import ExecutePanel from './components/ExecutePanel.vue';
import AppAlert from '@/components/AppAlert.vue'

const flow = useFlowStore()
</script>

<template>
  <div class="h-screen flex">
    <NodePalette />

    <div class="flex-1">
        <FlowCanvas />
    </div>
    <div class="flex flex-col">
      <NodeInspector
        v-if="flow.selectedNode || flow.selectedEdge"
        :node="flow.selectedNode"
        :edge="flow.selectedEdge"
        :key="flow.selectedNode?.id"
      />
      <ExecutePanel class="flex-1"/>
    </div>
    <AppAlert />
  </div>
</template>
