import type { Node, Edge } from '@vue-flow/core'

export function hasCycle(nodes: Node[], edges: Edge[]): boolean {
  const adj = new Map<string, string[]>()

  // build adjacency list
  for (const node of nodes) {
    adj.set(node.id, [])
  }

  for (const edge of edges) {
    adj.get(edge.source)?.push(edge.target)
  }

  const visited = new Set<string>()
  const stack = new Set<string>()

  function dfs(nodeId: string): boolean {
    if (stack.has(nodeId)) return true // cycle found
    if (visited.has(nodeId)) return false

    visited.add(nodeId)
    stack.add(nodeId)

    for (const next of adj.get(nodeId) ?? []) {
      if (dfs(next)) return true
    }

    stack.delete(nodeId)
    return false
  }

  for (const node of nodes) {
    if (dfs(node.id)) return true
  }

  return false
}
