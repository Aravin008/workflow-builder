import { NodeDefinition } from "@/workflow/core/types"
import { startNodeHandler } from "./start.handler"
import StartNode from "@/components/customNodes/StartNode.vue"

export const startNodeDefinition: NodeDefinition = {
  type: "start",
  label: "Start",
  category: "control",
  color: "bg-green-100",
  isEntry: true,
  configSchema: [
    {
      key: "payload",
      label: "Initial Payload (JSON)",
      type: "string",
      required: true
    }
  ],
  ui: {
    component: StartNode
  },
  handler: startNodeHandler
}
