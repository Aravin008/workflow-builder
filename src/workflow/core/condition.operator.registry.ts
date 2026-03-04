// export type ConditionOperator = (
//   left: any,
//   right: any
// ) => boolean

export interface OperatorDefinition {
  key: string
  label: string
  handler: (left: any, right?: any) => boolean
}

class OperatorRegistry {
  private registry = new Map<string, OperatorDefinition>()

  register(op:OperatorDefinition) {
    this.registry.set(op.key, op)
  }

  get(name: string): OperatorDefinition {
    const op = this.registry.get(name)
    if (!op) {
      throw new Error(`Operator "${name}" not found`)
    }
    return op
  }

  getAll() {
    return Array.from(this.registry.values())
  }
}

export const operatorRegistry = new OperatorRegistry()
