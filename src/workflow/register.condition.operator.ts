import { operatorRegistry } from "./core/condition.operator.registry"

export function registerCoreOperators() {
  operatorRegistry.register("equals", (a, b) => a == b)
  operatorRegistry.register("not_equals", (a, b) => a != b)
  operatorRegistry.register("gt", (a, b) => Number(a) > Number(b))
  operatorRegistry.register("lt", (a, b) => Number(a) < Number(b))
  operatorRegistry.register("gte", (a, b) => Number(a) >= Number(b))
  operatorRegistry.register("lte", (a, b) => Number(a) <= Number(b))
}
