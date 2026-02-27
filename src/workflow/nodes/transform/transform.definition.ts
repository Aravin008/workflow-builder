import { NodeDefinition } from "../../core/types"
import { transformNodeHandler } from "./transform.handler"

export const transformNodeDefinition: NodeDefinition = {
  type: "transform",
  label: "Transform",
  category: "data",

  configSchema: [
    {
      key: "field",
      label: "Field",
      type: "string",
      required: true
    },
    {
      key: "operation",
      label: "Operation",
      type: "select",
      required: true,
      options: []   // 👈 we’ll inject dynamically
    },
    {
      key: "value",
      label: "Value",
      type: "string"
    }
  ],

  handler: transformNodeHandler
}
