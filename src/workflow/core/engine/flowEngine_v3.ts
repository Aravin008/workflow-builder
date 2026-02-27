// import { useAlertStore } from "@/stores/alertStore"
import { WorkflowGraph, LogEntry } from "../../../types/workflow"
import { Edge } from "@vue-flow/core"
import { nodeRegistry } from "../node-registry"

type ExecutionState = {
  nodeId: string
  payload: Record<string, any>
}

export async function runWorkflow(
  graph: WorkflowGraph
): Promise<{ logs: LogEntry[]; errors: string[] }> {

  const logs: LogEntry[] = []
  const errors: string[] = []
  // const alert = useAlertStore()

  const { nodes, edges } = graph
  const executionQueue: ExecutionState[] = []

  // 🔹 Find Entry Node via registry
  const startNode = nodes.find(n => {
    const def = nodeRegistry.get(n.data.type)
    return def.isEntry
  })

  if (!startNode) {
    // alert.show("No Start node Found")
    errors.push("No Start node found")
    return { logs, errors }
  }

  // 🔹 Build Node Map
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

  // 🔹 Build Adjacency List
  const adj: Record<string, string[]> = {}
  edges.forEach(e => {
    if (!adj[e.source]) adj[e.source] = []
    adj[e.source].push(e.target)
  })

  // 🔹 Push initial execution state
  executionQueue.push({
    nodeId: startNode.id,
    payload: JSON.parse(startNode.data.payload)
  })

  // 🔹 Execution Loop
  while (executionQueue.length > 0) {
    const current = executionQueue.shift()!
    const node = nodeMap[current.nodeId]

    logs.push({
      nodeId: node.id,
      type: node.data.type,
      payload: structuredClone(current.payload)
    })

    const definition = nodeRegistry.get(node.data.type)

    const result = await definition.handler(
      node,
      current.payload,
      adj,
      edges
    )

    result.nextNodeIds.forEach(nextId => {
      executionQueue.push({
        nodeId: nextId,
        payload: structuredClone(result.payload)
      })
    })
  }

  return { logs, errors }
}
