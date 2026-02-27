# Architecture

## Overview

Workflow Builder is a **fully client-side, graph-driven workflow engine** built as a single-page application (SPA).  
The system is designed around a clear separation of concerns between **visual representation**, **state management**, and **execution logic**.

The application enables users to:
- Visually compose workflows using nodes and edges
- Configure node-specific logic through dedicated editors
- Validate workflow structure and logic
- Execute workflows deterministically from start to end

No backend services are required; all computation, validation, and persistence happen entirely in the browser.

---

## High-Level Architecture

The system is organized into four primary layers:

```
UI Layer (Vue Components)
↓
State Layer (Pinia Stores)
↓
Validation Layer (Graph Utilities)
↓
Execution Layer (Workflow Engine)
```

Each layer has a well-defined responsibility, allowing the application to remain modular, testable, and extensible.

---

## UI Layer

The UI layer is responsible for rendering the workflow graph and all user interactions.

Key components:
- **FlowCanvas** – Hosts the Vue Flow canvas and manages node/edge interactions
- **Custom Node Renderers** – Visual representations for Start, Transform, Condition, and End nodes
- **Node Inspector** – Contextual right-side panel for editing selected nodes or edges
- **Execution Panel** – Displays execution logs and simulation output

UI components are intentionally kept lightweight and stateless where possible.  
They reflect application state but do not own business logic.

---

## State Layer (Pinia)

All workflow state is centralized in Pinia stores, primarily `flowStore`.

Responsibilities:
- Managing nodes and edges
- Tracking selection state
- Synchronizing canvas and inspector updates
- Handling persistence (LocalStorage, import/export)

Using Pinia as a **single source of truth**:
- Eliminates prop drilling
- Ensures consistent state across components
- Makes the workflow graph fully serializable

---

## Undo / Redo Architecture

Undo and redo functionality is implemented at the **state layer** using a snapshot-based history model.

### Design
- Structural changes to the workflow graph (node/edge add, delete, clear) push snapshots into a bounded undo stack
- Each snapshot contains a deep-cloned copy of:
  - Nodes
  - Edges
- History is capped at a fixed size (last 10 states) to prevent memory growth

### Behavior
- Undo restores the previous graph snapshot
- Redo reapplies a reverted snapshot
- Performing a new action clears the redo stack to maintain consistency

### Scope
Undo/redo is intentionally limited to **structural graph mutations**.
Fine-grained form edits (e.g., typing in node editors) are excluded to:
- Avoid noisy history states
- Preserve predictable UX
- Reduce unnecessary state churn

This approach balances usability with implementation simplicity while covering the most impactful user actions.

---

## Core Domain Model

The workflow system is modeled using strongly typed domain entities defined in:

- `src/types/nodes.ts`
- `src/types/workflow.ts`

### Workflow Graph

A workflow consists of:
- **Nodes** – Logical units of execution
- **Edges** – Directed connections defining execution order

TypeScript enforces correctness by ensuring that each node carries the data required for its specific behavior.

---

## Node Types

### Start Node
- Entry point of the workflow
- Produces the initial payload

### Transform Node
- Applies transformations to the payload
- Supports string and numeric operations

### Condition Node
- Evaluates logical expressions
- Routes execution via `true` or `false` branches

### End Node
- Terminates execution
- Outputs the final result

Each node type has:
1. A TypeScript definition
2. A custom Vue Flow renderer
3. A dedicated editor component
4. Execution logic isolated from UI concerns

---

## Execution Model

Workflow execution is a **pure and deterministic process**.

### Execution Flow
1. Execution begins at the Start node
2. The payload flows through connected nodes
3. Each node processes the payload and returns:
   - A transformed value (Transform)
   - A branch decision (Condition)
4. Execution continues until an End node is reached

### Branching Logic
Condition nodes route execution using explicitly labeled edges:
- `true` branch
- `false` branch

Edges carry branch metadata, ensuring predictable and debuggable execution paths.

---

## Validation Strategy

Validation is split into two phases:

### Structural Validation
Performed during graph editing:
- Missing Start node
- Adding second Start node
- Prevents invalid connections
- Enforces direction and branching rules
- Ensures Start and End node constraints

### Logical Validation
Performed before execution:
- Detects cycles in the graph
- Prevents infinite execution loops
- Ensures a valid Start → End execution path exists

Cycle detection and traversal logic are implemented in `utils/graph.ts`.

---

## Extensibility

The architecture is designed to make adding new node types straightforward.

To introduce a new node:
1. Define its TypeScript schema
2. Create a custom Vue Flow node renderer
3. Implement a configuration editor
4. Add execution logic

This modular design avoids tight coupling and allows the system to scale without refactoring existing functionality.

---

## Persistence & Data Flow

Workflow state persistence is handled entirely on the client:
- **LocalStorage autosave** for session recovery
- **JSON import/export** for manual backup and sharing

Because the workflow graph is fully serializable, no backend storage is required.

---

## Deployment Architecture

The application is deployed as a **static site** using GitHub Pages.

Key characteristics:
- Fully client-side SPA
- No server dependencies
- Optimized production bundle generated by Vite

This deployment strategy minimizes infrastructure complexity while remaining ideal for demos, prototypes, and technical assessments.
