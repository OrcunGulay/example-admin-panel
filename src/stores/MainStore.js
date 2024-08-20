import { makeAutoObservable } from 'mobx'

export default class MainStore {
  token = ''
  user = {}
  constructor() {
    makeAutoObservable(this)
  }
  setToken(set) {
    this.token = set
  }
  setUser(set) {
    this.user = set
  }
}
