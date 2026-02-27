import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { type Edge, type Node, type Connection, Position } from '@vue-flow/core';
import { ConditionNode, NodeType, TransformNode, TypeNode } from '@/types/nodes';

export const useFlowStore = defineStore('flow', () => {
  const nodes = ref<Node[]>([])
  const edges = ref<Edge[]>([])
  const selectedNodeId = ref<string | null>(null)
  const selectedEdgeId = ref<string | null>(null)


  function createStartNode(label: string) {
    return {
      type: 'start' as const,
      label,
      payload: '{ "message": "hello" }',
    }
  }

  function createTransformNode(label: string): TransformNode {
    return {
      type: 'transform' as const,
      label,
      field: 'message',
      operation: 'uppercase',
      value: '',
    }
  }

  function createConditionNode(label: string): ConditionNode {
    return {
      type: 'condition' as const,
      label,
      field: 'message',
      operator: 'equals',
      value: '',
    }
  }

  function createEndNode(label: string) {
    return {
      type: 'end' as const,
      label,
    }
  }

  function createNodeData(type: TypeNode, label: string): NodeType {
    switch (type) {
      case 'start':
        return createStartNode(label)

      case 'transform':
        return createTransformNode(label)

      case 'condition':
        return createConditionNode(label)

      case 'end':
        return createEndNode(label)
    }
  }

  function addNode(type: TypeNode, label: string) {
    const nodeData = createNodeData(type, label)

    const baseNode: Node = {
      id: crypto.randomUUID(),
      type, 
      position: {
        x: 250,
        y: 100 + nodes.value.length * 80,
      },
      data: nodeData,
    }

    nodes.value.push(baseNode)
  }

  // watch(() => selectedEdge,
  //   (selectedEdge) => {
  //     console.log('selectedEdge updated:', selectedEdge)
  //   },
  //   { deep: true }
  // )

  // function addEdge(connection: Connection) {
  //   edges.value.push(connection)
  // }

  function clearCanvas() {
    nodes.value = []
    edges.value = []
  }

  function selectNode(id: string | null) {
    selectedNodeId.value = id
    selectedEdgeId.value = null
  }

  function selectEdge(id: string | null) {
    selectedEdgeId.value = id
    selectedNodeId.value = null
  }

  function deleteNode(id: string) {
    nodes.value = nodes.value.filter(n => n.id !== id)
    edges.value = edges.value.filter(
      e => e.source !== id && e.target !== id
    )
    selectedNodeId.value = null
  }

  function deleteEdge(id: string) {
    edges.value = edges.value.filter(e => e.id !== id)
    selectedEdgeId.value = null
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

  const selectedEdge = computed(() =>
    edges.value.find(n => n.id === selectedEdgeId.value) ?? null
  )

  return {
    nodes,
    edges,
    selectedNodeId,
    selectedNode,
    selectedEdgeId,
    selectedEdge,
    addNode,
    // addEdge,
    selectNode,
    selectEdge,
    updateNodeData,
    deleteNode,
    deleteEdge,
    clearCanvas
  }
})
