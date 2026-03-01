<script setup lang="ts">
import { useVueFlow, VueFlow, MarkerType, Connection } from '@vue-flow/core'
import { useFlowStore } from '@/stores/flowStore'
import { Edge } from '@/types/workflow'
import { useAlertStore } from '@/stores/alertStore'
import { computed, markRaw } from 'vue'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { Background } from '@vue-flow/background'
import { useUndoRedoHotkeys } from '@/utils/undoRedo'
import { nodeRegistry } from '@/workflow/core/node-registry'
import { useExectionStore } from '@/stores/executionStrore'

useUndoRedoHotkeys()
const flow = useFlowStore()
const execution = useExectionStore()
const { addEdges, project } = useVueFlow()
const alert = useAlertStore()
// const nodeTypes = markRaw({
//   condition: ConditionNode,
//   start: StartNode,
//   end: EndNode,
//   transform: TransformNode
// })


const nodeTypes = computed(() => {
  const types: Record<string, any> = {}

  nodeRegistry.getAll().forEach(node => {
    if (node?.ui?.component) {
      types[node.type] = markRaw(node?.ui?.component)
    }
  })

  return types
})



function onConnect(connection: Connection) {
  const sourceNode = flow.nodes.find(n => n.id === connection.source)
  const targetNode = flow.nodes.find(n => n.id === connection.target)

  if (!sourceNode || !targetNode) return

  if (targetNode.data.type === 'start') {
    alert.show('Start node cannot have incoming connections')
    return
  }

  if (sourceNode.data.type === 'end') {
    alert.show('End node cannot have outgoing connections')
    return
  }

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

  // addEdges([edge])
  flow.addEdge(edge)
}

function onNodeClick({ node }) {
  flow.selectNode(node.id)
}

function onEdgeClick({ edge }) {
  flow.selectEdge(edge.id)
}

function onDragOver(event: DragEvent) {
  event.preventDefault()
  event.dataTransfer!.dropEffect = 'move'
}

function onDrop(event: DragEvent) {
  event.preventDefault()

  const type = event.dataTransfer?.getData('application/vueflow')
  if (!type) return

  const pane = document.querySelector('.vue-flow__pane') as HTMLElement
  const bounds = pane.getBoundingClientRect()

  const NODE_WIDTH = 150
  const NODE_HEIGHT = 60
  const position = project({
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top,
  })

  flow.addNode(type as any, {
      x: position.x - NODE_WIDTH / 2,
      y: position.y - NODE_HEIGHT / 2,
    }
  )
}
</script>

<template>
  <VueFlow
    v-model:nodes="flow.nodes"
    v-model:edges="flow.edges"
    :node-types="nodeTypes"
    @connect="onConnect"
    @node-click="onNodeClick"
    @edge-click="onEdgeClick"
    @dragover="onDragOver"
    @drop="onDrop"
    :default-edge-options="{
      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    }"
  >
    <MiniMap />
    <Controls />
    <Background />
  </VueFlow>
</template>
