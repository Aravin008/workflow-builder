export type ConditionOperator = (
  left: any,
  right: any
) => boolean

class OperatorRegistry {
  private registry = new Map<string, ConditionOperator>()

  register(name: string, handler: ConditionOperator) {
    this.registry.set(name, handler)
  }

  get(name: string): ConditionOperator {
    const op = this.registry.get(name)
    if (!op) {
      throw new Error(`Operator "${name}" not found`)
    }
    return op
  }

  getAll() {
    return Array.from(this.registry.keys())
  }
}

export const operatorRegistry = new OperatorRegistry()
