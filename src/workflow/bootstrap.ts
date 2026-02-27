import { registerCoreNodes } from "./register-nodes"
import { registerCoreOperations } from "./register-operations"
import { nodeRegistry } from "./core/node-registry"
import { operationRegistry } from "./core/operation-registry"
import { transformNodeDefinition } from "./nodes/transform/transform.definition"
import { registerCoreOperators } from "./register.condition.operator"
import { conditionNodeDefinition } from "./nodes/conditions/condition.definition"
import { operatorRegistry } from "./core/condition.operator.registry"

export function initializeWorkflowSystem() {
  // 1️⃣ Register operations first
  registerCoreOperators()
  registerCoreOperations()

  // 2️⃣ Inject dynamic operation options into transform schema
  const operationField = transformNodeDefinition.configSchema.find(
    f => f.key === "operation"
  )

  if (operationField) {
    operationField.options = operationRegistry.getAll()
  }

  // Condition operators
  const operatorField = conditionNodeDefinition.configSchema.find(
    f => f.key === "operator"
  )

  if (operatorField) {
    operatorField.options = operatorRegistry.getAll()
  }

  // 3️⃣ Register nodes
  registerCoreNodes()
}
