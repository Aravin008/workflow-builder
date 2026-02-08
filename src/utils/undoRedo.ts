import { onMounted, onBeforeUnmount } from 'vue'
import { useFlowStore } from '@/stores/flowStore'

export function useUndoRedoHotkeys() {
  const flow = useFlowStore()

  console.log("registerig the Undo key events!");

  function handleKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement

    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return
    }

    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault()
      flow.undo()
    }

    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
      e.preventDefault()
      flow.redo()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
}
