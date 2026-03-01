import { Edge } from "@vue-flow/core"
import { Component } from "vue"

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

export type FieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'select'
  | 'json'

export interface ConfigField {
  key: string
  label: string
  type: FieldType
  required?: boolean
  default?: any
  placeholder?: string
  options?: { label: string; value: any }[]
}

export interface NodeDefinition {
  type: string
  label: string
  category: string
  color?: string
  isEntry?: boolean
  isTerminal?: boolean
  configSchema: ConfigField[]
  ui?: {
    component: Component
  }
  handler: NodeHandler
}
