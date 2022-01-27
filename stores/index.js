import { useStaticRendering } from 'mobx-react'
import config from './config'
import { setRootStoreRefs } from './hooks'

const isServer = typeof window === 'undefined'

useStaticRendering(isServer)

export class Store {
  constructor(initialState) {
    for (const k in config) {
      if (config.hasOwnProperty(k)) {
        this[k] = config[k].create(initialState[k] || {})
      }
    }
  }
}

let store = null

export function createStore(initialState = {}) {
  if (isServer) {
    return new Store(initialState)
  }
  if (store === null) {
    store = new Store(initialState)
  }
  setRootStoreRefs(store)
  return store
}
