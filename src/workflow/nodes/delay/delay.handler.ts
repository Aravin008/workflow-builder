import { NodeHandler } from "@/workflow/core/types"

export const delayNodeHandler: NodeHandler = async (
  node,
  payload,
  adj
) => {
  await new Promise(res => setTimeout(res, node.data.duration || 0))
  return {
    payload,
    nextNodeIds: adj[node.id] || []
  }
}