import { NodeDefinition } from "./types"

class NodeRegistry {
  private registry = new Map<string, NodeDefinition>()

  register(def: NodeDefinition) {
    if (this.registry.has(def.type)) {
      // throw new Error(`Node type "${def.type}" already registered`)
      return
    }
    this.registry.set(def.type, def)
  }

  get(type: string): NodeDefinition {
    const def = this.registry.get(type)
    if (!def) {
      throw new Error(`Node type "${type}" not found`)
    }
    return def
  }

  getAll(): NodeDefinition[] {
    return Array.from(this.registry.values())
  }
}

export const nodeRegistry = new NodeRegistry()
