import axios, { type AxiosInstance } from 'axios'
import type { HYRequestConfig } from '@/service/request/type'
import { useLoginStore } from '@/stores'
import router from '@/router'

class HYRequest {
  instance: AxiosInstance
  //request实例 => axios的实例
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 添加请求头
        const loginStore = useLoginStore()
        if (loginStore.userTokenInfo.token && config.headers) {
          config.headers[
            'Authorization'
          ] = `Bearer ${loginStore.userTokenInfo.token}`
        }
        // console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        // console.log('全局请求失败的拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局响应成功的拦截')
        return res
      },
      (err) => {
        // console.log('全局响应失败的拦截')
        if (err.response?.status === 401) {
          // 删除用户信息
          const loginStore = useLoginStore()
          loginStore.delUserInfo()
          // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
          // 为什么携带出现401页面的地址?
          // router.currentRoute.value.fullPath 当前访问页面的path地址
          // 说明: vue3=》router.currentRoute.value 是个ref变量,所以访问需要加value
          // 答：为了让用户重新登录后,跳转回上次访问页面=》交互体验好
          // fullPath完整path地址,会携带地址参数,但是path不会
          router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
        }
        return Promise.reject(err)
      }
    )

    // 针对特定的hyRequest实例添加拦截器
    // 往拦截器中添加------(拦截器可以使用多次，且不会冲突)
    this.instance.interceptors.request.use(
      // @ts-ignore
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求的方法
  request<T>(config: HYRequestConfig) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          // 单次响应的成功拦截
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: HYRequestConfig) {
    return this.request<T>({ ...config, method: 'get' })
  }
}

export default HYRequest
