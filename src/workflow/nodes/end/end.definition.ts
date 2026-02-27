import { NodeDefinition } from "../../core/types"
import { endNodeHandler } from "./end.handler"

export const endNodeDefinition: NodeDefinition = {
  type: "end",
  label: "End",
  category: "control",
  isTerminal: true,

  configSchema: [],  // no configuration needed

  handler: endNodeHandler
}
