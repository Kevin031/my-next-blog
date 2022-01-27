import { types } from 'mobx-state-tree'

export const AppStore = types
  .model('AppStore')
  .props({
    renderTime: types.maybeNull(types.number),
    releases: types.maybeNull(types.string),
    theme: types.optional(types.union(types.literal('dark'), types.literal('light')), 'light'),
  })
  .actions(self => ({
    init() {
      const releases = require('../../releases.md')
      self.releases = releases
    },
    setRenderTime(val) {
      self.renderTime = val
    },
    toggleThemeMode() {
      self.theme = self.theme === 'light' ? 'dark' : 'light'
      if (typeof document !== 'undefined') {
        document.querySelector('html').setAttribute('theme-mode', self.theme)
      }
    },
  }))
  .views(self => ({
    get formatRenderTime() {
      return self.renderTime && self.renderTime / 1000 + 's'
    },
  }))
