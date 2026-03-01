// src/stores/executionStore.ts
import { LogEntry } from '@/types/workflow'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useExectionStore = defineStore('execution', () => {
  const isRunning = ref(false)
  const activeNodeId = ref<string | null>(null)
  const completedNodeIds = ref(new Set<string>())
  const logs = ref<LogEntry[]>([]) 
  const errors = ref<string[]>([])

  function start() {
    isRunning.value = true
    completedNodeIds.value.clear()
    logs.value = []
    errors.value = []
  }

  function setActive(nodeId: string) {
    activeNodeId.value = nodeId
  }

  function markCompleted(nodeId: string) {
    completedNodeIds.value.add(nodeId)
    activeNodeId.value = null
  }

  function addLog(log: LogEntry) {
    logs.value.push(log)
  }

  function addError(error: string) {
    errors.value.push(error)
  }

  function stop() {
    isRunning.value = false
    activeNodeId.value = null
  }

  // Reset
  function clearLogs() {
    isRunning.value = false
    activeNodeId.value = null
    completedNodeIds.value.clear()
    errors.value = []
    logs.value = []
  }

  console.log("Initilised store", isRunning, activeNodeId, logs)
  return {
    isRunning,
    activeNodeId,
    completedNodeIds,
    logs,
    start,
    setActive,
    markCompleted,
    addLog,
    addError,
    stop,
    clearLogs
  }
})
