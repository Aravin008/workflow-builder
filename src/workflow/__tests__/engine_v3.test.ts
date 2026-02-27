import { describe, it, expect } from 'vitest'
import { runWorkflow } from '../core/engine/flowEngine_v3'
import { initializeWorkflowSystem } from '../bootstrap'

initializeWorkflowSystem()

describe('Workflow Engine', () => {

  it('should execute simple workflow correctly', async () => {

    const graph = {
      nodes: [
        {
          id: '1',
          data: { type: 'start', payload: JSON.stringify({ message: 'hi', count: 5 }) }
        },
        {
          id: '2',
          data: { type: 'transform', field: 'message', operation: 'append', value: ' world' }
        },
        {
          id: '3',
          data: { type: 'condition', field: 'count', operator: 'gt', value: 3 }
        },
        {
          id: '4',
          data: { type: 'end' }
        }
      ],
      edges: [
        { source: '1', target: '2' },
        { source: '2', target: '3' },
        { source: '3', target: '4', branch: 'true' }
      ]
    }

    const result = await runWorkflow(graph as any)

    expect(result.errors.length).toBe(0)

    const lastLog = result.logs[result.logs.length - 1]

    expect(lastLog.payload.message).toBe('hi world')
    expect(lastLog.payload.count).toBe(5)
  })

})
