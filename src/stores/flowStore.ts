import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { type Edge, type Node, type Connection, Position } from '@vue-flow/core';
import { ConditionNode, NodeType, TransformNode, TypeNode } from '@/types/nodes';
import ConditionNodeCmp from '@/components/customNodes/conditionNode.vue';

export const useFlowStore = defineStore('flow', () => {
  const nodes = ref<Node[]>([])
  const edges = ref<Edge[]>([])
  const selectedNodeId = ref<string | null>(null)


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
