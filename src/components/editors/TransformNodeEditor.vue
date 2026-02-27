<script setup lang="ts">
import { useFlowStore } from '@/stores/flowStore'
import type { Node } from '@vue-flow/core'
import type { TransformNode, TypeTransformOp, TypeFieldType } from '@/types/nodes'
import { computed } from 'vue';

const props = defineProps<{
  node: Node<TransformNode>
}>()

const flow = useFlowStore()

const fields: TypeFieldType[] = ['message', 'count']
const operationsList = {
  'message': [
    'uppercase',
    'prepend',
    'append',
  ],
  'count': [
    'add',
    'multiply'
  ]
}

function getDefaultOperation(field: TypeFieldType): TypeTransformOp {
  return operationsList[field][0] as TypeTransformOp
}

const operations = computed(() => operationsList[props.node.data.field])

function update(data: Partial<TransformNode>) {
  flow.updateNodeData(props.node.id, data)
}

function onFieldChange(event: Event) {
  const field = (event.target as HTMLSelectElement).value as TypeFieldType

  update({
    field,
    operation: getDefaultOperation(field),
    value: ''
  })
}

</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="text-sm font-medium">Field</label>
      <select
        class="w-full border p-2 rounded"
        :value="props.node.data.field"
        @change="onFieldChange"
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
