import { operationRegistry } from "./core/operation-registry"

export function registerCoreOperations() {
  operationRegistry.register("uppercase", (current) =>
    String(current).toUpperCase()
  )

  operationRegistry.register("append", (current, value) =>
    String(current) + String(value ?? "")
  )

  operationRegistry.register("prepend", (current, value) =>
    String(value ?? "") + String(current)
  )

  operationRegistry.register("add", (current, value) =>
    Number(current) + Number(value ?? 0)
  )

  operationRegistry.register("multiply", (current, value) =>
    Number(current) * Number(value ?? 1)
  )
}
