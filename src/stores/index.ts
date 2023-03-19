import { createPinia } from 'pinia'
import { useLoginStore } from '@/stores/login/login'
import type { App } from 'vue'

const pinia = createPinia()

function registerStore(app: App<Element>) {

  // 1.use的pinia
  app.use(pinia)
  // 2.加载本地数据
  const loginStore = useLoginStore()
  // 为了防止刷新页面时动态路由失效,导致页面丢失
  loginStore.loadLocalCacheAction()
}

export default registerStore
export * from './login/login'
