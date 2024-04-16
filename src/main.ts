import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuex from './store'
import router from './permission'
import 'element-plus/es/components/message/style/css'
// import 'emoji-mart/css/emoji-mart'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
app.use(vuex)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router).mount('#app')
