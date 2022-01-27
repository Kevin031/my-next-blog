import { types, flow, getRoot } from 'mobx-state-tree'
import http from '../../services/http'
import moment from 'moment'
import { useStore } from '../hooks'

const PhotoModel = types.model('Photo').props({
  id: types.identifier,
  nid: types.number,
  url: types.string,
  // width: types.number,
  // height: types.number
})

export const PhotoStore = types
  .model('PhotoStore')
  .props({
    __list: types.map(PhotoModel),
    status: types.optional(
      types.union(
        types.literal('init'),
        types.literal('pending'),
        types.literal('loading'),
        types.literal('done'),
      ),
      'pending',
    ),
    page: types.optional(types.number, 0),
  })
  .actions(self => ({
    init() {
      self.__list.clear()
      self.page = 0
      self.status = 'pending'
    },
    fetch: flow(function* () {
      if (self.status !== 'pending') return false
      const limit = 10
      self.status = 'loading'
      const res = yield http.get(`api/photos?page=${self.page}&limit=${limit}`)
      res.list.forEach(item => {
        item.nid = item.id
        item.id = item.name.split('.')[0]
        self.__list.put(item)
      })
      self.page++
      if (res.list.length < limit) {
        self.status = 'done'
      } else {
        self.status = 'pending'
      }
      return true
    }),
  }))
  .views(self => ({
    get list() {
      return Array.from(self.__list.values())
    },
  }))
