<script setup lang="ts">
import { useFlowStore } from '@/stores/flowStore'
import type { Node } from '@vue-flow/core'
import type { ConditionNode, ConditionOp, TypeFieldType } from '@/types/nodes'

const props = defineProps<{
  node: Node<{ data: ConditionNode }>
}>()

const flow = useFlowStore()

const fields: TypeFieldType[] = ['message', 'count']
const operators: ConditionOp[] = ['equals', 'not_equals', 'gt', 'lt']

function update(data: Partial<ConditionNode>) {
  flow.updateNodeData(props.node.id, data)
}
</script>

<template>
  <div class="space-y-4">
    <select
      class="w-full border p-2 rounded"
      :value="props.node.data.field"
      @change="update({ field: ($event.target as HTMLSelectElement).value as TypeFieldType })"
    >
      <option v-for="f in fields" :key="f" :value="f">{{ f }}</option>
    </select>

    <select
      class="w-full border p-2 rounded"
      :value="props.node.data.operator"
      @change="update({ operator: ($event.target as HTMLSelectElement).value as ConditionOp })"
    >
      <option v-for="op in operators" :key="op" :value="op">{{ op }}</option>
    </select>

    <input
      class="w-full border p-2 rounded"
      :value="props.node.data.value"
      @input="update({ value: ($event.target as HTMLInputElement).value })"
    />
  </div>
</template>
