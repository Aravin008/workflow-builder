import { createApp } from 'vue'
import './style.css'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.mount('#app')
