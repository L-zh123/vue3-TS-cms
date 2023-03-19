import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { useLoginStore } from '@/stores'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 导航守卫
router.beforeEach((to, from) => {
  document.title = '后台管理系统-' + to.meta.title
  const loginStore = useLoginStore()
  const token = loginStore.userTokenInfo.token
  if (!token && to.path.startsWith('/main')) {
    return '/login'
  }
  // 如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
