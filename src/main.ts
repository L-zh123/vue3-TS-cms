import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/index.less'
import store from './stores'
import App from './App.vue'
import router from './router'
import registerIcons from '@/global/register-icons'
// 针对ElMessage和ElLoading等组件引入样式
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'

const app = createApp(App)
//使用封装的全局图标插件
app.use(registerIcons)
app.use(store)
app.use(router)

app.mount('#app')
