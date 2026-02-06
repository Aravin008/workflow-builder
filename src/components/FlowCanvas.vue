<script setup lang="ts">
import { useVueFlow, VueFlow } from '@vue-flow/core'
import { useFlowStore } from '@/stores/flowStore'
import type { Connection } from '@vue-flow/core'

const flow = useFlowStore()
const { addEdges } = useVueFlow()

function onConnect(connection: Connection) {
  // flow.addEdge(connection)
  addEdges(connection)
}

function onNodeClick({ node }) {
  flow.selectNode(node.id)
}
</script>

<template>
  <VueFlow
    v-model:nodes="flow.nodes"
    v-model:edges="flow.edges"
    @connect="onConnect"
    @node-click="onNodeClick"
  />
</template>
