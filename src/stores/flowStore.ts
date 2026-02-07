import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { type Edge, type Node, type Connection, Position, useVueFlow } from '@vue-flow/core';
import { ConditionNode, FlowExport, NodeType, TransformNode, TypeNode } from '@/types/nodes';
import { useAlertStore } from './alertStore';
import { hasCycle } from '@/utils/graph';

const VERSION = '2.4'
export const useFlowStore = defineStore('flow', () => {
  const nodes = ref<Node[]>([])
  const edges = ref<Edge[]>([])
  const selectedNodeId = ref<string | null>(null)
  const selectedEdgeId = ref<string | null>(null)
  const alert = useAlertStore()

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

  function canAddStartNode() {
    return !nodes.value.some(n => n.data.type === 'start')
  }
  

  function addNode(type: TypeNode, label: string, position: { x: number; y: number }) {
    if (type === 'start' && !canAddStartNode()) {
      alert.show('Only one Start node allowed')
      return
    }

    const nodeData = createNodeData(type, label)

    const baseNode: Node = {
      id: crypto.randomUUID(),
      type, 
      position: position?? {
        x: 250,
        y: 100
      },
      data: nodeData,
    }

    nodes.value.push(baseNode)
  }

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

  function exportFlow(): FlowExport {
    return {
      version: VERSION,
      nodes: nodes.value,
      edges: edges.value,
      meta: {
        createdAt: new Date().toISOString(),
      },
    }
  }

  function importFlow(data: FlowExport) {
    if (!data.nodes || !data.edges) {
      alert.show('Invalid workflow file')
      return
    }

    nodes.value = data.nodes
    edges.value = data.edges
    selectedNodeId.value = null
    selectedEdgeId.value = null
  }

  watch(
    [nodes, edges],
    () => {
      const data = exportFlow()
      localStorage.setItem('vueflow-autosave', JSON.stringify(data))
    },
    { deep: true }
  )

  function loadFromStorage() {
    const saved = localStorage.getItem('vueflow-autosave')
    if (saved) {
      try {
        importFlow(JSON.parse(saved))
      } catch {
        alert.show('Failed to restore previous session')
      }
    }
  }

  loadFromStorage()

  function canConnect(sourceId: string, targetId: string): boolean {
    const source = nodes.value.find(n => n.id === sourceId)
    const target = nodes.value.find(n => n.id === targetId)

    if (!source || !target) return false

    // no self loop
    if (sourceId === targetId) {
      alert.show('Node cannot connect to itself')
      return false
    }

    // start node: no inbound
    if (target.data.type === 'start') {
      alert.show('Start node cannot have incoming connections')
      return false
    }

    // end node: no outbound
    if (source.data.type === 'end') {
      alert.show('End node cannot have outgoing connections')
      return false
    }

    return true
  }

  function addEdge(edge: Edge) {
    if (!canConnect(edge.source, edge.target)) return
    edges.value.push(edge)
  }

  function validateBeforeExecute(): boolean {
    if (!nodes.value.length) {
      alert.show('Flow is empty')
      return false
    }

    // cycle detection (your existing logic)
    if (hasCycle(nodes.value, edges.value)) {
      alert.show('Flow contains a cycle')
      return false
    }

    return true
  }



  return {
    version: VERSION,
    nodes,
    edges,
    selectedNodeId,
    selectedNode,
    selectedEdgeId,
    selectedEdge,
    addNode,
    addEdge,
    selectNode,
    selectEdge,
    updateNodeData,
    deleteNode,
    deleteEdge,
    clearCanvas,
    exportFlow,
    importFlow,
    validateBeforeExecute
  }
})
