import { defineStore } from 'pinia'
interface State {
  name: string,
  num: number,
  [key: string]: any
}
const userStore = defineStore('user', {
  state: ():State => {
    return {
      name: '王五',
      num: 1
    }
  },
  getters: {
    double: state => state.num * 2
  },
  actions: {
    updateName(name: string): any {
      this.name = name
    }
  }
  // 其他配置...
})

export default userStore
