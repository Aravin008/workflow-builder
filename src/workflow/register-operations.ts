import { operationRegistry } from "./core/operation-registry"

export function registerCoreOperations() {
  operationRegistry.register({
    key: "uppercase",
    label: "Uppercase",
    handler: (current) =>
      String(current).toUpperCase()
  })

  operationRegistry.register({
    key: "append",
    label: "Append",
    handler: (current, value) =>
      String(current) + String(value ?? "")
  })

  operationRegistry.register({
    key: "prepend",
    label: "Prepend",
    handler: (current, value) =>
      String(value ?? "") + String(current)
  })

  operationRegistry.register({
    key: "add",
    label: "Add",
    handler: (current, value) =>
      Number(current) + Number(value ?? 0)
  })

  operationRegistry.register({
    key: "multiply",
    label: "Multiply",
    handler: (current, value) =>
      Number(current) * Number(value ?? 1)
  })
}