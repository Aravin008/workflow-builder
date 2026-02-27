import { NodeHandler } from "@/workflow/core/types"

export const startNodeHandler: NodeHandler = async (
  node,
  payload,
  adj
) => {
  return {
    payload,
    nextNodeIds: adj[node.id] || []
  }
}
