import router from '@/router'
import type { RouteRecord, RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  //1.动态获取所有的路由对象，放到数组中
  //路由对象都在独立的文件中
  //从文件中将所有路由对象先读取数组中

  // 1.在路由跳转之前进行动态添加路由
  const localRoutes = []
  //1.1 读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    { eager: true }
  )
  // 把 files对象添加到localRoutes数组中去
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}
// 当进入 /main 时,展示第一个页面
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()
  // 根据菜单匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find(
        (item) => item.path === subMenu.url.split('/main/')[1]
      )
      if (route) routes.push(route)
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
  return routes
}

/**
 * 根据路径匹配需要显示的菜单
 * @param path 要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const subMenu of userMenus) {
    const route = subMenu.children.find((item: any) => item.url === path)
    if (route) return route
  }
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: any[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadcrumbs.push(
          { id: menu.id, name: menu.name, path: menu.url },
          { id: subMenu.id, name: subMenu.name, path: subMenu.url }
        )
      }
    }
  }
  return breadcrumbs
}
