export type TypeForm = {
  username: string
  password: string
}
export type TUserInfo = {
  code: number
  data: {
    id: number
    name: string
    cellphone: string
    enable: number
    createAt: Date
    updateAt: Date
    role: {
      id: number
      name: string
      intro: string
      createAt: Date
      updateAt: Date
    }
    department: {
      id: number
      name: string
      parentId: number
      createAt: Date
      updateAt: Date
      leader: string
    }
  }
}
