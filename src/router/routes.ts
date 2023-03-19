export const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    meta: {
      title: '首页'
    },
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: import('@/views/not-found/not-found.vue')
  }
]
