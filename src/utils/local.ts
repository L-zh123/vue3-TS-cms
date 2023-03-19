class Local {
  setLocal(key: string, value: any) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }
  getLocal(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
      // console.log(JSON.parse(value))
      return JSON.parse(value)
    }
  }
  removeLocal(key: string) {
    localStorage.removeItem(key)
  }
  clear() {
    localStorage.clear()
  }
}
export default new Local()
