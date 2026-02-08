<script setup lang="ts">
import { useFlowStore } from '@/stores/flowStore'
import type { Node } from '@vue-flow/core'
import type { StartNode } from '@/types/nodes'

const props = defineProps<{
  node: Node<StartNode>
}>()

const flow = useFlowStore()

function updatePayload(payload: string) {
  flow.updateNodeData(props.node.id, { payload })
}
</script>

<template>
  <div class="space-y-3">
    <label class="block text-sm font-medium">Payload (JSON)</label>
    <textarea
      class="w-full border rounded p-2 font-mono text-sm"
      rows="6"
      :value="props.node.data.payload"
      @input="updatePayload(($event.target as HTMLTextAreaElement).value)"
    />
  </div>
</template>
