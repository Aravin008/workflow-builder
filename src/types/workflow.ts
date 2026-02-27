import { NodeType } from "./nodes"

export type GraphNode = {
  id: string
  data: NodeType
}

export type Edge = {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
  type?: string
  branch?: 'true' | 'false' 
}

export type WorkflowGraph = {
  nodes: GraphNode[]
  edges: Edge[]
}

export type LogEntry = {
  nodeId: string
  type: NodeType['type']
  payload?: any
}