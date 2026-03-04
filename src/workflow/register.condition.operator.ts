import { operatorRegistry } from "./core/condition.operator.registry"

export function registerCoreOperators() {
  operatorRegistry.register({
    label: "==",
    key: "equals",
    handler: (a, b) => a == b} )
  
  operatorRegistry.register({
    label: "!=",
    key: "not_equals",
    handler: (a, b) => a != b} )
  
  operatorRegistry.register({
    label: ">",
    key: "gt",
    handler: (a, b) => Number(a) > Number(b)} )

  operatorRegistry.register({
    label: "<",
    key: "lt",
    handler: (a, b) => Number(a) < Number(b)} )

  operatorRegistry.register({
    label: ">=",
    key: "gte",
    handler: (a, b) => Number(a) >= Number(b)} )
    
  operatorRegistry.register({
    label: "<=",
    key: "lte",
    handler: (a, b) => Number(a) <= Number(b)} )
}
