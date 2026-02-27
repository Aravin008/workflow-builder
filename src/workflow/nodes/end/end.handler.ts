import { NodeHandler } from "../../core/types"

export const endNodeHandler: NodeHandler = async (
  node,
  payload
) => {
  return {
    payload,
    nextNodeIds: []  // 👈 terminal
  }
}
