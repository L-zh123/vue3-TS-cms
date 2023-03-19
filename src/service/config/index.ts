//1.区分开发环境和生产环境 （手动切换）
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.com:8000'

//2.代码逻辑判断,判断当前环境
// vite默认提供的环境变量
// console.log(import.meta.env.MODE) // 环境
// console.log(import.meta.env.DEV) // 是否是开发环境
// console.log(import.meta.env.PROD) // 是否是生产环境

let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'http://152.136.185.210:4000'
} else {
  // 开发环境
  BASE_URL = 'http://152.136.185.210:5000'
}
// 第三种方式:通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_BASE_URL)

export const TIME_OUT = 10000
export { BASE_URL }
