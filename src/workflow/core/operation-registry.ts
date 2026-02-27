export type TransformOperation = (
  currentValue: any,
  configValue: any
) => any

class OperationRegistry {
  private registry = new Map<string, TransformOperation>()

  register(name: string, handler: TransformOperation) {
    this.registry.set(name, handler)
  }

  get(name: string): TransformOperation {
    const op = this.registry.get(name)
    if (!op) {
      throw new Error(`Operation "${name}" not found`)
    }
    return op
  }

  getAll() {
    return Array.from(this.registry.keys())
  }
}

export const operationRegistry = new OperationRegistry()
