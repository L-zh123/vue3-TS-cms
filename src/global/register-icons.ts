import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 图标全局注册，注册成插件
function registerIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
export default registerIcons
