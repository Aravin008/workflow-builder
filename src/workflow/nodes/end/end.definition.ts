import EndNode from "@/components/customNodes/EndNode.vue"
import { NodeDefinition } from "../../core/types"
import { endNodeHandler } from "./end.handler"

export const endNodeDefinition: NodeDefinition = {
  type: "end",
  label: "End",
  category: "control",
  color: "bg-red-100",
  isTerminal: true,

  configSchema: [],  // no configuration needed
  ui: {
    component: EndNode
  },
  handler: endNodeHandler
}
