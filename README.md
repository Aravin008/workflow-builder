# Workflow Builder

A highly interactive, node-based workflow automation tool built with **Vue 3**, **TypeScript**, and **Vue Flow**. This application allows users to design, simulate, and export complex logic flows using a drag-and-drop interface.

**🔗 [Live Demo Hosted on GitHub Pages](https://aravin008.github.io/workflow-builder/)**

---

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
git clone <your-repo-link>
cd workflow
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

src
├── App.vue
├── main.ts
│
├── types
│   ├── nodes.ts            # Node & edge type definitions
│   └── workflow.ts         # Core workflow data models
│
├── config
│   └── transforms.ts       # Supported transform operations & metadata
│
├── stores
│   ├── flowStore.ts        # Central workflow graph state (nodes, edges)
│   └── alertStore.ts       # Global alert / notification state
│
├── utils
│   ├── graph.ts            # Graph validation (cycles, connectivity)
│   └── transformations.ts # Execution logic for transform nodes
│
├── components
│   ├── FlowCanvas.vue      # Vue Flow canvas & edge/node wiring
│   ├── NodePalette.vue     # Draggable node palette (Start, If, Transform, End)
│   ├── NodeInspector.vue   # Right-side configuration panel
│   ├── ExecutePanel.vue   # Workflow execution & logs
│   ├── ImportFile.vue     # JSON workflow import
│   ├── ExportFile.vue     # JSON workflow export
│   ├── AppAlert.vue       # Global alert UI
│   │
│   ├── editors             # Node & edge configuration editors
│   │   ├── StartNodeEditor.vue
│   │   ├── TransformNodeEditor.vue
│   │   ├── ConditionNodeEditor.vue
│   │   ├── EndNodeEditor.vue
│   │   └── EdgeEditor.vue
│   │
│   └── customNodes         # Custom Vue Flow node renderers
│       ├── StartNode.vue
│       ├── TransformNode.vue
│       ├── ConditionNode.vue
│       └── EndNode.vue
│
└── style.css               # Global styles


### Key Features

-   **Node Palette:**  Drag and drop Start, Transform, Condition (If-Else), and End nodes.
-   **Dynamic Configuration:**  Reactive right-side panel to edit node-specific logic (e.g., String/Math operations).
-   **Execution Simulation:**  Real-time data processing from Start to End with visual execution logs.
-   **Graph Validation:**  Built-in cycle detection (Infinite loop prevention) and connection validation.
-   **Persistence:**  Automatic session recovery via  LocalStorage  and manual JSON Export/Import.

## Design Decisions

- **Centralized State:** All workflow state (nodes, edges, selection, persistence) is managed via Pinia to avoid prop drilling and simplify cross-component coordination.
- **Validation Strategy:** Structural validation (invalid connections, missing nodes) happens during graph edits, while logical validation (cycle detection) runs before execution.
- **Persistence:** LocalStorage autosave enables session recovery without requiring a backend.
- **Static Deployment:** The app is fully client-side and deployed via GitHub Pages to simplify hosting and reduce infrastructure complexity.
