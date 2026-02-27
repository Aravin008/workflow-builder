import { useAlertStore } from "@/stores/alertStore"
import { TypeNode } from "@/types/nodes"
import { GraphNode, LogEntry, WorkflowGraph } from "@/types/workflow"
import { Edge, Node } from "@vue-flow/core"

// type NodeType = 'start' | 'end' | 'transform' | 'condition'

type ExecutionState = {
  nodeId: string,
  payload: Record<string, any>
}

interface ExecutionResult {
  payload: Record<string, any>,
  nextNodeIds: string[]
}
type Payload = Record<string, any>

type NodeHandler = (
  node: GraphNode,
  payload: Payload,
  adj: Record<string, any[]>,
  edges: Edge[]
) => Promise<ExecutionResult>

type handleNodeType = 'start' | 'end' | 'transform' | 'condition'
const nodeHandler:Record<handleNodeType, NodeHandler> = {
  start: startNodeHandler,
  end: endNodeHandler,
  transform: transformNodeHandler,
  condition: conditionNodeHandler
}

async function startNodeHandler(node, payload: Payload, adj): Promise<ExecutionResult> {
  return {
    payload,
    nextNodeIds: adj[node.id] || []
  }
}

async function endNodeHandler(node, payload, adj): Promise<ExecutionResult> {
  const newPayload: Payload = { ...payload }

  return {
    payload: newPayload,
    nextNodeIds: adj[node.id] || []
  }
}

async function conditionNodeHandler(
  node: Node,
  payload: Record<string, any>,
  adj: Record<string, string[]>,
  edges: Edge[]
): Promise<ExecutionResult> {

  const { field, operator, value } = node.data
  const condVal = payload[field]

  let takeTrueBranch = false

  switch (operator) {
    case 'equals':
      takeTrueBranch = condVal == value
      break
    case 'not_equals':
      takeTrueBranch = condVal != value
      break
    case 'gt':
      takeTrueBranch = Number(condVal) > Number(value)
      break
    case 'lt':
      takeTrueBranch = Number(condVal) < Number(value)
      break
  }

  const outgoingEdges = edges.filter(e => e.source === node.id)

  const branchEdge = outgoingEdges.find(
    e => e.branch === (takeTrueBranch ? 'true' : 'false')
  )

  return {
    payload,
    nextNodeIds: branchEdge ? [branchEdge.target] : []
  }
}



async function transformNodeHandler(node, payload, adj): Promise<ExecutionResult> {
  const newPayload = { ...payload }

  const { field, operation, value } = node.data

  if (field in newPayload) {
    switch (operation) {
      case 'uppercase':
        newPayload[field] = String(newPayload[field]).toUpperCase()
        break
      case 'prepend':
        newPayload[field] = String(value ?? '') + newPayload[field]
        break
      case 'append':
        newPayload[field] = newPayload[field] + String(value ?? '')
        break
      case 'add':
        newPayload[field] = Number(newPayload[field]) + Number(value ?? 0)
        break
      case 'multiply':
        newPayload[field] = Number(newPayload[field]) * Number(value ?? 1)
        break
    }
  }

  return {
    payload: newPayload,
    nextNodeIds: adj[node.id] || []
  }
}


export async function runWorkflow(graph: WorkflowGraph): Promise<{ logs: LogEntry[], errors: string[] }> {
  let logs: LogEntry[] = []
  const errors: string[] = []
  const alert = useAlertStore()
  const { nodes, edges } = graph
  const executionQueue:ExecutionState[] = [];

  // Find Start node
  const startNode = nodes.find(n => n.data.type === 'start')

  if (!startNode) {
    alert.show("No Start node Found")
    errors.push('No Start node found')
    return { logs, errors }
  }

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))
  const adj: Record<string, string[]> = {}
  edges.forEach(e => {
    if (!adj[e.source]) adj[e.source] = []
    adj[e.source].push(e.target)
  })

  executionQueue.push({ nodeId: startNode.id, payload: JSON.parse(startNode.data.payload) })

  while(executionQueue.length > 0) {
    const current = executionQueue.shift()

    const node = nodeMap[current.nodeId]
    const handler = nodeHandler[node.data.type as TypeNode]

    logs.push({
      nodeId: node.id,
      type: node.data.type,
      payload: structuredClone(current.payload)
    })

    const result = await handler(node, current.payload, adj, edges)

    result.nextNodeIds.forEach((nextId) => {
      executionQueue.push({
        nodeId: nextId,
        payload: result.payload
      })
    })
  }

    return { logs, errors }
}

