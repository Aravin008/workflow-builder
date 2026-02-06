import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import type { Edge, Node, Connection } from '@vue-flow/core'

export const useFlowStore = defineStore('flow', () => {
  const nodes = ref<Node[]>([])
  const edges = ref<Edge[]>([])
  const selectedNodeId = ref<string | null>(null)

  function addNode(type: string, label: string) {
    console.log('adding node', type, label)

    nodes.value.push({
      id: crypto.randomUUID(),
      type,
      position: { x: 250, y: 100 + nodes.value.length * 80 },
      data: { label },
    })
  }

  function addEdgeFromConnection(connection: Connection) {
    const edge: Edge = {
      id: crypto.randomUUID(),
      source: connection.source!,
      target: connection.target!,
      sourceHandle: connection.sourceHandle,
      targetHandle: connection.targetHandle,
      type: 'default',
    }

    edges.value.push(edge)
  }

  watch(
    () => edges,
    (edges) => {
      console.log('Edges updated:', edges)
    },
    { deep: true }
  )

  // function addEdge(connection: Connection) {
  //   edges.value.push(connection)
  // }

  function selectNode(id: string | null) {
    selectedNodeId.value = id
  }

  function updateNodeData(id: string, data: any) {
    const node = nodes.value.find(n => n.id === id)
    if (node) {
      node.data = { ...node.data, ...data }
    }
  }

  const selectedNode = computed(() =>
    nodes.value.find(n => n.id === selectedNodeId.value) ?? null
  )

  return {
    nodes,
    edges,
    selectedNodeId,
    selectedNode,
    addNode,
    // addEdge,
    selectNode,
    updateNodeData,
  }
})
