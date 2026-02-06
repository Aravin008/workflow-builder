<script setup lang="ts">
import { useFlowStore } from '@/stores/flowStore'
import type { Node } from '@vue-flow/core'
import type { TransformNode, TypeTransformOp, TypeFieldType } from '@/types/nodes'

const props = defineProps<{
  node: Node<{ data: TransformNode }>
}>()

const flow = useFlowStore()

const fields: TypeFieldType[] = ['message', 'count']
const operations: TypeTransformOp[] = [
  'uppercase',
  'prepend',
  'append',
  'add',
  'multiply'
]

function update(data: Partial<TransformNode>) {
  flow.updateNodeData(props.node.id, data)
}
</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="text-sm font-medium">Field</label>
      <select
        class="w-full border p-2 rounded"
        :value="props.node.data.field"
        @change="update({ field: ($event.target as HTMLSelectElement).value as TypeFieldType })"
      >
        <option v-for="f in fields" :key="f" :value="f">
          {{ f }}
        </option>
      </select>
    </div>

    <div>
      <label class="text-sm font-medium">Operation</label>
      <select
        class="w-full border p-2 rounded"
        :value="props.node.data.operation"
        @change="update({ operation: ($event.target as HTMLSelectElement).value as TypeTransformOp })"
      >
        <option v-for="op in operations" :key="op" :value="op">
          {{ op }}
        </option>
      </select>
    </div>

    <div>
      <label class="text-sm font-medium">Value</label>
      <input
        class="w-full border p-2 rounded"
        :value="props.node.data.value ?? ''"
        @input="update({ value: ($event.target as HTMLInputElement).value })"
      />
    </div>
  </div>
</template>
