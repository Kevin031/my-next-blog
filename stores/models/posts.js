import { types, flow, getRoot } from 'mobx-state-tree'
import http from '../../services/http'
import moment from 'moment'
import { useStore } from '../hooks'

const PostModel = types
  .model('Post')
  .props({
    id: types.identifier,
    nid: types.number,
    title: types.string,
    // body_format: types.string,
    tags: types.array(types.frozen({})),
    created: types.string,
    changed: types.string,
    body: types.maybeNull(types.string),
    column: types.maybeNull(types.string),
  })
  .views(self => ({
    get abstract() {
      return self.body
        .split('\r\n')
        .filter((item, index) => index < 10)
        .join('\r\n')
    },
    get formattedCreatedTime() {
      const timestamp = new Date(self.created).getTime()
      if (timestamp > new Date(new Date().toLocaleDateString()).getTime()) {
        // 今天
        return moment(timestamp).format('HH:mm')
      } else if (Date.now() - timestamp < 7 * 24 * 3600 * 1000) {
        // 7天内
        return moment(timestamp).format('dddd HH:mm')
      } else {
        // 7天前
        return moment(timestamp).format('YYYY MMMM Do HH:mm')
      }
    },
  }))

export const PostStore = types
  .model('PostStore')
  .props({
    __list: types.map(PostModel),
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
    fetch: flow(function* ({ columns = null }) {
      if (self.status !== 'pending') return false
      const limit = 10
      self.status = 'loading'
      const res = yield http.get(
        `api/v2/articles?page=${self.page}&limit=${limit}&columns=${columns ? columns.join(',') : ''}`,
      )
      res.list.forEach(item => {
        item.id = item.id.toString()
        item.column = item.column ? item.column.toString() : null
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
    fetchNode: flow(function* (id) {
      if (self.__list.get(id)) {
        return self.__list.get(id)
      }
      const data = yield http.get(`api/articles/${id}`)
      const model = PostModel.create(data)
      self.__list.put(model)
      return model
    }),
  }))
  .views(self => ({
    get list() {
      return Array.from(self.__list.values())
    },
    getFilteredList({ tags, columns }) {
      return self.list
        .filter(item => columns.length || columns.includes(item.id))
        .filter(item => !tags.length || item.tags.some(item => tags.includes(item.tid)))
    },
  }))
