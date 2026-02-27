import { Edge } from "@vue-flow/core"

export type Payload = Record<string, any>

export interface ExecutionResult {
  payload: Payload
  nextNodeIds: string[]
}

export type NodeHandler = (
  node: any,
  payload: Payload,
  adj: Record<string, string[]>,
  edges: Edge[]
) => Promise<ExecutionResult>

export type FieldType = 'string' | 'number' | 'boolean' | 'select'

export interface ConfigField {
  key: string
  label: string
  type: FieldType
  required?: boolean
  options?: string[]
}

export interface NodeDefinition {
  type: string
  label: string
  category: string
  isEntry?: boolean
  isTerminal?: boolean
  configSchema: ConfigField[]
  handler: NodeHandler
}
