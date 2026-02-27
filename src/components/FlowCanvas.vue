<script setup lang="ts">
import { useVueFlow, VueFlow } from '@vue-flow/core'
import { useFlowStore } from '@/stores/flowStore'
import type { Connection } from '@vue-flow/core'
import { Edge } from '@/types/workflow'
import ConditionNode from './customNodes/conditionNode.vue'

const flow = useFlowStore()
const { addEdges } = useVueFlow()
const nodeTypes = {
  condition: ConditionNode,
}
function onConnect(connection: Connection) {
  // Find the source node
  const sourceNode = flow.nodes.find(n => n.id === connection.source)

  // Build edge object
  const edge: Edge = {
    id: crypto.randomUUID(),
    source: connection.source!,
    target: connection.target!,
    sourceHandle: connection.sourceHandle,
    targetHandle: connection.targetHandle,
    type: 'default',
  }

  // Assign branch if source node is a condition node
  if (sourceNode?.data.type === 'condition') {
    if (connection.sourceHandle === 'left') {
      edge.branch = 'true'
    } else if (connection.sourceHandle === 'bottom') {
      edge.branch = 'false'
    }
  }

  // Add edge to VueFlow + store
  addEdges([edge])
}

function onNodeClick({ node }) {
  flow.selectNode(node.id)
}
</script>

<template>
  <VueFlow
    v-model:nodes="flow.nodes"
    v-model:edges="flow.edges"
    :node-types="nodeTypes"
    @connect="onConnect"
    @node-click="onNodeClick"
  />
</template>
