import { nodeRegistry } from "./core/node-registry"
import { startNodeDefinition } from "./nodes/start/start.definition"
import { transformNodeDefinition } from "./nodes/transform/transform.definition"
import { conditionNodeDefinition } from "./nodes/conditions/condition.definition"
import { endNodeDefinition } from "./nodes/end/end.definition"
import { delayNodeDefinition } from "./nodes/delay/delay.definition"

export function registerCoreNodes() {
  nodeRegistry.register(startNodeDefinition)
  nodeRegistry.register(transformNodeDefinition)
  nodeRegistry.register(conditionNodeDefinition)
  nodeRegistry.register(endNodeDefinition)
  nodeRegistry.register(delayNodeDefinition)
}
