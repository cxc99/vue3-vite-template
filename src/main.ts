import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:windi.css'
import { router } from './router/index'
import { pinia } from './pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(pinia).mount('#app')
