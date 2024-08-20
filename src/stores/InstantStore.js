import { configure, makeAutoObservable } from 'mobx'

configure({ enforceActions: 'never' })

class InstantStoreC {
  constructor() {
    makeAutoObservable(this)
  }

  // VARIABLES
  checkCafe = {}

  setCheckCafe(set) {
    this.checkCafe = set
  }
}

export const InstantStore = new InstantStoreC()
