import { defineStore } from 'pinia'
import type { TypeForm } from '@/utils/type'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenuByRoleId
} from '@/service/login'
import local from '@/utils/local'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'

export interface ILoginState {
  userTokenInfo: {
    id: number
    name: string
    token: string
  }
  userInfo: any
  userMenus: any[]
}

export const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    userTokenInfo: local.getLocal('token') || {
      id: -1,
      name: '',
      token: ''
    },
    userInfo: local.getLocal('userInfo') ?? {},
    userMenus: local.getLocal('userMenus') ?? []
  }),
  actions: {
    async accountLoginAction(account: TypeForm) {
      try {
        const res = await accountLoginRequest(account)
        this.userTokenInfo.id = res.data.id
        this.userTokenInfo.name = res.data.name
        this.userTokenInfo.token = res.data.token
        // 保存到本地
        local.setLocal('token', this.userTokenInfo)
        return res.data.id
      } catch (e) {
        console.log(e)
      }
      // return true
    },
    loadLocalCacheAction() {
      if (this.userTokenInfo.token && this.userInfo && this.userMenus) {
        const routes = mapMenusToRoutes(this.userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    },
    // 获取用户信息
    async getUserInfo(id: number) {
      try {
        const res = await getUserInfoById(id)
        this.userInfo = res.data
        // console.log('res: ', res)
        // 保存到本地
        local.setLocal('userInfo', res.data)
        return this.userInfo.role.id
      } catch (e) {
        console.log(e)
      }
    },
    // 根据角色id获取权限菜单
    async getUserMenuByRoleId(id: number) {
      try {
        const res = await getUserMenuByRoleId(id)
        this.userMenus = res.data
        // console.log('role:', res)
        // 保存到本地
        local.setLocal('userMenus', res.data)
      } catch (e) {
        console.log(e)
      }
    },
    // 清除用户信息
    delUserInfo() {
      local.removeLocal('token')
      local.removeLocal('userInfo')
      local.removeLocal('userMenus')
    }
  }
})
