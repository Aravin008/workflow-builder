<script setup lang="ts">
import { computed } from 'vue'
import { useFlowStore } from '@/stores/flowStore'
import type { Node, Edge } from '@vue-flow/core'

// import StartNodeEditor from './editors/StartNodeEditor.vue'
// import TransformNodeEditor from './editors/TransformNodeEditor.vue'
// import ConditionNodeEditor from './editors/ConditionNodeEditor.vue'
// import EndNodeEditor from './editors/EndNodeEditor.vue'
import EdgeEditor from './editors/EdgeEditor.vue'
import NodeEditForm from './editors/NodeEditForm.vue'
import { nodeRegistry } from '@/workflow/core/node-registry'

const props = defineProps<{
  node: Node | null
  edge: Edge | null
}>()

const flow = useFlowStore()

const isNode = computed(() => !!props.node)
const isEdge = computed(() => !!props.edge)
const selectedNode = props.node
const definition = selectedNode && nodeRegistry.get(selectedNode.data.type)
console.log("isNode", isNode, isEdge, definition, selectedNode?.data?.type)

</script>

<template>
  <aside class="w-80 border-l p-4 bg-gray-50 relative border rounded">
    <div
      @click="flow.selectNode(null); flow.selectEdge(null)"
      class="bg-black px-2 py-1 cursor-pointer text-white absolute right-2 top-2 border rounded"
    >
      Close
    </div>

    <!-- NODE -->
    <template v-if="isNode">
      <h2 class="font-semibold mb-4">Node Inspector</h2>

      <!-- <component
        :is="{
          start: StartNodeEditor,
          transform: TransformNodeEditor,
          condition: ConditionNodeEditor,
          end: EndNodeEditor
        }[props.node!.data.type]"
        :node="props.node"
      /> -->
      <NodeEditForm
        v-if="definition"
        :schema="definition.configSchema"
        v-model="selectedNode.data"
      />

      <button
        class="mt-6 bg-red-800 cursor-pointer text-white px-3 py-2 rounded w-full font-bold"
        @click="flow.deleteNode(props.node!.id)"
      >
        Delete Node
      </button>
    </template>

    <!-- EDGE -->
    <template v-else-if="isEdge">
      <h2 class="font-semibold mb-4">Edge Inspector</h2>

      <EdgeEditor :edge="props.edge" />

      <button
        class="mt-6 bg-red-800 cursor-pointer text-white px-3 py-2 rounded w-full text-bold"
        @click="flow.deleteEdge(props.edge!.id)"
      >
        Delete Edge
      </button>
    </template>
  </aside>
</template>
