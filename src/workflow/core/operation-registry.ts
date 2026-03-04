export interface OperationDefinition {
  key: string
  label: string
  handler: (current: any, value?: any) => any
}

class OperationRegistry {
  private operations = new Map<string, OperationDefinition>()

  register(def: OperationDefinition) {
    this.operations.set(def.key, def)
  }

  get(key: string) {
    const op = this.operations.get(key)
    if (!op) throw new Error(`Unknown operation: ${key}`)
    return op
  }

  getAll() {
    return Array.from(this.operations.values())
  }
}

export const operationRegistry = new OperationRegistry()