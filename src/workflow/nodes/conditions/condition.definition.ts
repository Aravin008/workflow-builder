import ConditionNode from "@/components/customNodes/ConditionNode.vue"
import { NodeDefinition } from "../../core/types"
import { conditionNodeHandler } from "./condition.handler"

export const conditionNodeDefinition: NodeDefinition = {
  type: "condition",
  label: "Condition",
  category: "logic",
  color: "bg-yellow-100",

  configSchema: [
    {
      key: "field",
      label: "Field",
      type: "string",
      required: true
    },
    {
      key: "operator",
      label: "Operator",
      type: "select",
      required: true,
      options: []
    },
    {
      key: "value",
      label: "Compare Value",
      type: "string",
      required: true
    }
  ],
  ui: {
    component: ConditionNode
  },
  handler: conditionNodeHandler
}
