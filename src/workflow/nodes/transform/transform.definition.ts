import { operationRegistry } from "@/workflow/core/operation-registry"
import { NodeDefinition } from "../../core/types"
import { transformNodeHandler } from "./transform.handler"

export const transformNodeDefinition: NodeDefinition = {
  type: "transform",
  label: "Transform",
  category: "data",

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

  handler: transformNodeHandler
}
