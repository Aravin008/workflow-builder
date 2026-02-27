import { NodeHandler } from "../../core/types"
import { operatorRegistry } from "../../core/condition.operator.registry"

export const conditionNodeHandler: NodeHandler = async (
  node,
  payload,
  adj,
  edges
) => {
  const { field, operator, value } = node.data
  const leftValue = payload[field]

  const op = operatorRegistry.get(operator)
  const result = op(leftValue, value)

  const outgoingEdges = edges.filter(e => e.source === node.id)

  const branchEdge = outgoingEdges.find(
    e => e.branch === (result ? "true" : "false")
  )

  return {
    payload,
    nextNodeIds: branchEdge ? [branchEdge.target] : []
  }
}
