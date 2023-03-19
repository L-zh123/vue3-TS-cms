import type { TUserInfo, TypeForm } from '@/utils/type'
import hyRequest from '@/service'

export const accountLoginRequest = (account: TypeForm) =>
  hyRequest.request<{
    code: number
    data: { id: number; name: string; token: string }
  }>({
    method: 'POST',
    url: '/login',
    data: {
      name: account.username,
      password: account.password
    }
  })

// 获取用户信息
export const getUserInfoById = (id: number) =>
  hyRequest.request<TUserInfo>({
    method: 'get',
    url: `/users/${id}`
  })

// 获取用户权限菜单
export const getUserMenuByRoleId = (id: number) =>
  hyRequest.request<any>({
    url: `/role/${id}/menu`
  })
