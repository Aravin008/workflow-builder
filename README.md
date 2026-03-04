# Workflow Builder

A highly interactive, node-based workflow automation tool built with **Vue 3**, **TypeScript**, and **Vue Flow**. This application allows users to design, simulate, and export complex logic flows using a drag-and-drop interface.

**🔗 [Live Demo Hosted on GitHub Pages](https://aravin008.github.io/workflow-builder/)**

---

## Architecture
- This project uses a layered architecture with a registry-driven execution model.
- UI and state management are handled with Vue 3 and Pinia
- Workflow execution runs in a framework-agnostic TypeScript engine
- Node types are self-describing and registered via a centralized Node Registry

For detailed architectural documentation, see **🔗 [Architecture](https://github.com/Aravin008/workflow-builder/blob/main/architecture.md)**.


## Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Language:** TypeScript
- **Style:** Tailwind
- **State Management:** Pinia
- **Flow Engine:** [Vue Flow](https://vueflow.dev)
- **Bundler:** Vite
- **Deployment:** [GitHub Pages](https://pages.github.com/)

---

## Getting Started

### Prerequisites
- **Node.js:** v22.0 or higher (Recommended)
- **Package Manager:** npm

### 1. Installation
Clone the repository and install the dependencies:
```bash
git clone git@github.com:Aravin008/workflow-builder.git
cd workflow-builder
npm install
```

### 2. Development Server
Run the app in development mode with Hot Module Replacement (HMR):
```bash
npm run dev
```
### 3. Production Build & Local Preview
To test the optimized production bundle locally:
```bash
npm run build
npm run preview
```
### 4. Deployment
To deploy the application to your own GitHub Pages environment:

1.  Ensure you have a GitHub repository initialized.
2.  Update the  `base`  property in  `vite.config.ts`  to match your repository name (e.g.,  `/workflow-builder/`).
3.  Run the deployment script:
```bash
npm run deploy
```
_Note: This script automatically builds the project and pushes the  `dist`  folder to a  `gh-pages`  branch._

----------

## 📁 Project Structure

```text
src/
├── App.vue
├── main.ts
│
├── types/
│   ├── nodes.ts
│   └── workflow.ts
│
├── config/
│   └── transforms.ts
│
├── stores/
│   ├── flowStore.ts
│   └── alertStore.ts
│
├── utils/
│   ├── graph.ts
│   └── transformations.ts
│
├── components/
│   ├── FlowCanvas.vue
│   ├── NodePalette.vue
│   ├── NodeInspector.vue
│   ├── ExecutePanel.vue
│   ├── ImportFile.vue
│   ├── ExportFile.vue
│   ├── AppAlert.vue
│   │
│   ├── editors/
│   │   ├── StartNodeEditor.vue
│   │   ├── TransformNodeEditor.vue
│   │   ├── ConditionNodeEditor.vue
│   │   ├── EndNodeEditor.vue
│   │   └── EdgeEditor.vue
│   │
│   └── customNodes/
│       ├── StartNode.vue
│       ├── TransformNode.vue
│       ├── ConditionNode.vue
│       └── EndNode.vue
│
└── style.css
```


### Key Features

-   **Node Palette:**  Drag and drop Start, Transform, Condition (If-Else), and End nodes.
-   **Dynamic Configuration:**  Reactive right-side panel to edit node-specific logic (e.g., String/Math operations).
-   **Execution Simulation:**  Real-time data processing from Start to End with visual execution logs.
-   **Graph Validation:**  Built-in cycle detection (Infinite loop prevention) and connection validation.
-   **Persistence:**  Automatic session recovery via  LocalStorage  and manual JSON Export/Import.
- **Undo / Redo (Structural):** Supports undo and redo for core graph mutations such as node/edge creation, deletion, and canvas reset (up to last 10 actions).


## Design Decisions

- **Centralized State:** All workflow state (nodes, edges, selection, persistence) is managed via Pinia to avoid prop drilling and simplify cross-component coordination.
- **Validation Strategy:** Structural validation (invalid connections, missing nodes) happens during graph edits, while logical validation (cycle detection) runs before execution.
- **Persistence:** LocalStorage autosave enables session recovery without requiring a backend.
- **Static Deployment:** The app is fully client-side and deployed via GitHub Pages to simplify hosting and reduce infrastructure complexity.
- **Undo/Redo Scope:** Undo and redo are implemented for structural graph changes (nodes and edges). Fine-grained form edits are excluded to avoid noisy history states and improve UX predictability.

