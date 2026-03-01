import { NodeDefinition, NodeHandler } from "@/workflow/core/types"
import { delayNodeHandler } from "./delay.handler"
import DelayWorkflowNode from "@/components/customNodes/DelayWorkflowNode.vue"

export const delayNodeDefinition: NodeDefinition = {
  type: "delay",
  label: "Delay",
  category: "timer",
  color: "bg-yellow-300",
  configSchema: [
    {
      key: "duration",
      type: "number",
      label: "Duration (ms)"
    }
  ],
  ui: {
    component: DelayWorkflowNode
  },
  handler: delayNodeHandler
}