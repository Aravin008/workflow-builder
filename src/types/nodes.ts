export type TypeNode = 'start' | 'transform' | 'condition' | 'end';

export type TypeTransformOp = 
  | 'uppercase'
  | 'append'
  | 'add'
  | 'prepend'
  | 'multiply'

export type TypeFieldType = 'message' | 'count'

export type StartNode = {
  type: 'start'
  label: string
  payload: string
}

export type TransformNode = {
  type: 'transform'
  label: string
  field: TypeFieldType 
  operation: TypeTransformOp
  value?: string | number
}

export type ConditionOp = 'equals' | 'not_equals' | 'gt' | 'lt'

export type ConditionNode = {
  type: 'condition'
  label: string
  field: TypeFieldType
  operator: ConditionOp
  value: string | number
}


export type EndNode = {
  type: 'end'
  label: string
}

export type NodeType = StartNode | TransformNode | ConditionNode | EndNode