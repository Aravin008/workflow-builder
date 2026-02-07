<script setup lang="ts">
  import { ref } from 'vue'
  import { useFlowStore } from '@/stores/flowStore'
  import type { LogEntry } from '@/types/workflow'
  import { runWorkflow as flowEngine } from '@/utils/transformations'

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

  function logClass(type: string) {
    switch (type) {
      case 'start':
        return 'border-green-300 bg-green-50'
      case 'transform':
        return 'border-blue-300 bg-blue-50'
      case 'condition':
        return 'border-yellow-300 bg-yellow-50'
      case 'end':
        return 'border-red-300 bg-red-50'
      case 'error':
        return 'border-red-500 bg-red-100'
      default:
        return 'border-gray-200 bg-white'
    }
  }

</script>

<template>
  <div class="p-4 border-l w-80 bg-gray-50 flex flex-col border rounded overflow-auto">
    <h2 class="font-bold text-xl text-center p-2 pt-0">Execution Panel</h2>
    <div class="flex space-x-2 justify-center">
      <button
      class="bg-blue-600 text-white px-4 py-2 min-w-32 rounded hover:bg-blue-700 mb-4 font-semibold text-sm"
      @click="runWorkflow"
      :disabled="running"
    >
      {{ running ? 'Running...' : 'Play' }}
    </button>
    <button
      class="bg-gray-600 text-white px-4 py-2 min-w-32 rounded hover:bg-gray-700 mb-4 font-semibold text-sm"
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

      <!-- <ul v-else class="text-sm font-mono space-y-1">
        <li v-for="(log, idx) in logs" :key="idx">
          <span class="font-bold">{{ log.nodeId }} [{{ log.type }}]:</span>
          <span>{{ JSON.stringify(log.payload) }}</span>
        </li>
      </ul> -->

      <ul v-else class="space-y-3 text-sm font-mono">
        <li
          v-for="(log, idx) in logs"
          :key="idx"
          class="border rounded p-2"
          :class="logClass(log.type)"
        >
          <div class="flex justify-between items-center mb-1">
            <span class="font-bold uppercase text-xs">
              {{ log.type }}
            </span>
            <span class="text-xs text-gray-400 truncate max-w-[120px]">
              {{ log.nodeId }}
            </span>
          </div>

          <pre class="bg-gray-50 p-2 rounded overflow-x-auto text-xs">
            {{ JSON.stringify(log.payload, null, 2) }}
          </pre>
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
