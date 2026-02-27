import { NodeHandler } from "../../core/types"
import { operationRegistry } from "../../core/operation-registry"

export const transformNodeHandler: NodeHandler = async (
  node,
  payload,
  adj
) => {
  const newPayload = { ...payload }

  const { field, operation, value } = node.data

  if (!(field in newPayload)) {
    return {
      payload: newPayload,
      nextNodeIds: adj[node.id] || []
    }
  }

  const op = operationRegistry.get(operation)
  newPayload[field] = op(newPayload[field], value)

  return {
    payload: newPayload,
    nextNodeIds: adj[node.id] || []
  }
}
