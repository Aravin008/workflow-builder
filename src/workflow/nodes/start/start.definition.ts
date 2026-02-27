import { NodeDefinition } from "@/workflow/core/types"
import { startNodeHandler } from "./start.handler"

export const startNodeDefinition: NodeDefinition = {
  type: "start",
  label: "Start",
  category: "control",
  isEntry: true,
  configSchema: [
    {
      key: "payload",
      label: "Initial Payload (JSON)",
      type: "string",
      required: true
    }
  ],

  handler: startNodeHandler
}
