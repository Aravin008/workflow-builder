<script setup lang="ts">
import { ref } from 'vue'
import { useFlowStore } from '@/stores/flowStore'
import type { LogEntry } from '@/types/workflow'

// Use store
const flow = useFlowStore()

const running = ref(false)
const logs = ref<LogEntry[]>([])

function runWorkflow() {
  if (running.value) return

  if (!flow.validateBeforeExecute()) return

  running.value = true
  logs.value = []

  // Run engine
  const { logs: runLogs, errors } = flowEngine({
    nodes: flow.nodes,
    edges: flow.edges
  })

  if (errors.length > 0) {
    logs.value.push({ nodeId: 'ERROR', type: 'error', payload: errors.join('; ') })
  }

  // Append execution logs
  logs.value.push(...runLogs)

  // Done
  running.value = false

}

  function clearLogs() {
    logs.value = []
  }

import { runWorkflow as flowEngine } from '@/utils/transformations'
</script>

<template>
  <div class="p-4 border-l w-80 bg-gray-50 flex flex-col border rounded overflow-auto">
    <h2 class="font-bold text-xl text-center p-2">Execution Panel</h2>
    <div class="flex space-x-2 justify-center">
      <button
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      @click="runWorkflow"
      :disabled="running"
    >
      {{ running ? 'Running...' : 'Play' }}
    </button>
    <button
      class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mb-4"
      @click="clearLogs"
      :disabled="running"
    >
      {{ running ? 'Running...' : 'Clear' }}
    </button>
    </div>

    <div class="flex-1 overflow-auto border p-2 rounded bg-white">
      <template v-if="logs.length === 0">
        <p class="text-gray-400 text-sm">Execution logs will appear here...</p>
      </template>

      <ul v-else class="text-sm font-mono space-y-1">
        <li v-for="(log, idx) in logs" :key="idx">
          <span class="font-bold">{{ log.nodeId }} [{{ log.type }}]:</span>
          <span>{{ JSON.stringify(log.payload) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
div::-webkit-scrollbar {
  width: 6px;
}
div::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.2);
  border-radius: 3px;
}
</style>
