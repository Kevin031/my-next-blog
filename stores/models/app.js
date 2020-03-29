import { types } from 'mobx-state-tree'

export const AppStore = types.model('AppStore')
  .props({
    renderTime: types.maybeNull(types.number)
  })
  .actions(self => ({
    setRenderTime (val) {
      self.renderTime = val
    }
  }))
  .views(self => ({
    get formatRenderTime () {
      return self.renderTime && self.renderTime / 1000 + 's'
    }
  }))
