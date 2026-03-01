import { operationRegistry } from "@/workflow/core/operation-registry"
import { NodeDefinition } from "../../core/types"
import { transformNodeHandler } from "./transform.handler"
import TransformNode from "@/components/customNodes/TransformNode.vue"

export const transformNodeDefinition: NodeDefinition = {
  type: "transform",
  label: "Transform",
  category: "data",
  color: "bg-blue-100",

  configSchema: [
    {
      key: 'field',
      label: 'Field Name',
      type: 'string',
      required: true
    },
    {
      key: 'operation',
      label: 'Operation',
      type: 'select',
      required: true,
      options:  operationRegistry.getAll().map(op => ({
      label: op.label,
      value: op.key
    }))
    },
    {
      key: 'value',
      label: 'Value',
      type: 'string'
    }
  ],
  ui: {
    component: TransformNode
  },
  handler: transformNodeHandler
}
