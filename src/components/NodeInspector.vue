<script setup lang="ts">
import { computed } from 'vue'
import { useFlowStore } from '@/stores/flowStore'

import StartNodeEditor from './editors/StartNodeEditor.vue'
import TransformNodeEditor from './editors/TransformNodeEditor.vue'
import ConditionNodeEditor from './editors/ConditionNodeEditor.vue'
import EndNodeEditor from './editors/EndNodeEditor.vue'

const flow = useFlowStore()

const node = computed(() => flow.selectedNode)
</script>

<template>
  <aside class="w-80 border-l p-4 bg-gray-50">
    <div @click="flow.selectNode(null)" class="bg-black px-2 py-1 cursor-pointer text-white absolute right-1 top-1 border rounded">Close</div>
    <h2 class="font-semibold mb-4">Node Inspector</h2>

    <component
      :is="{
        start: StartNodeEditor,
        transform: TransformNodeEditor,
        condition: ConditionNodeEditor,
        end: EndNodeEditor
      }[node.data.type]"
      :node="node"
    />
  </aside>
</template>
