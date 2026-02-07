import { LogEntry, WorkflowGraph } from "@/types/workflow"

function applyTransform(node, payload) {
  const { field, operation, value } = node.data
  const current = payload[field]

  switch (operation) {
    case 'uppercase':
      return { ...payload, [field]: String(current).toUpperCase() }

    case 'append':
      return { ...payload, [field]: String(current) + value }

    case 'add':
      return { ...payload, [field]: Number(current) + Number(value) }
  }
}

export function runWorkflow(graph: WorkflowGraph): { logs: LogEntry[], errors: string[] } {
  const logs: LogEntry[] = []
  const errors: string[] = []

  const { nodes, edges } = graph

  // Find Start node
  const startNode = nodes.find(n => n.data.type === 'start')
  if (!startNode) {
    errors.push('No Start node found')
    return { logs, errors }
  }

  // Build adjacency list
  const adj: Record<string, string[]> = {}
  edges.forEach(e => {
    if (!adj[e.source]) adj[e.source] = []
    adj[e.source].push(e.target)
  })

  // Track visited to detect cycles
  const visited = new Set<string>()

  function traverse(nodeId: string, payload: any) {
    try {
      if (visited.has(nodeId)) {
        errors.push(`Cycle detected at node ${nodeId}`)
        return
      }
      visited.add(nodeId)

      const node = nodes.find(n => n.id === nodeId)!
      const { data } = node

      // Log current state
      logs.push({ nodeId, type: data.type, payload: JSON.parse(JSON.stringify(payload)) })

      switch (data.type) {
        case 'start':
          // payload already set in node.data.payload
          payload = JSON.parse(data.payload)
          break

        case 'transform':
          if (data.field in payload) {
            switch (data.operation) {
              case 'uppercase':
                payload[data.field] = String(payload[data.field]).toUpperCase()
                break
              case 'prepend':
                payload[data.field] = String(data.value ?? '') + payload[data.field]
                break
              case 'append':
                payload[data.field] = payload[data.field] + String(data.value ?? '')
                break
              case 'add':
                payload[data.field] = Number(payload[data.field]) + Number(data.value ?? 0)
                break
              case 'multiply':
                payload[data.field] = Number(payload[data.field]) * Number(data.value ?? 1)
                break
            }
          }
          break

        case 'condition':
          const condVal = payload[data.field]
          let takeBranch = false
          switch (data.operator) {
            case 'equals': takeBranch = condVal == data.value; break
            case 'not_equals': takeBranch = condVal != data.value; break
            case 'gt': takeBranch = Number(condVal) > Number(data.value); break
            case 'lt': takeBranch = Number(condVal) < Number(data.value); break
          }

          const outgoingEdges = edges.filter(e => e.source === nodeId)
          const branchEdge = outgoingEdges.find(e => e.branch === (takeBranch ? 'true' : 'false'))

          if (branchEdge) {
            traverse(branchEdge.target, payload)
          } else if (outgoingEdges.length === 1) {
            traverse(outgoingEdges[0].target, payload) // fallback
          }
          return

        case 'end':
          // nothing to do
          break
      }

      const outgoing = adj[nodeId] ?? []
      for (const nextId of outgoing) {
        traverse(nextId, payload)
      }
    } catch(Err) {
      errors.push(`${Err.message}`)
    }
  } 

    traverse(startNode.id, {})

    return { logs, errors }
}

