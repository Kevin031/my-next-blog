import { types } from 'mobx-state-tree'

export const AppStore = types.model('AppStore')
  .props({
    renderTime: types.maybeNull(types.number),
    releases: types.maybeNull(types.string)
  })
  .actions(self => ({
    init () {
      const releases = require('../../releases.md')
      self.releases = releases
    },
    setRenderTime (val) {
      self.renderTime = val
    }
  }))
  .views(self => ({
    get formatRenderTime () {
      return self.renderTime && self.renderTime / 1000 + 's'
    }
  }))
