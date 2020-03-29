import { types, flow } from 'mobx-state-tree'
import http from '../../services/http'

const TagModel = types.model('Tag')
  .props({
    id: types.identifier,
    tid: types.number,
    name: types.string,
    parent: types.maybeNull(types.reference(types.late(() => TagModel)))
  })

export const TagStore = types.model('TagStore')
  .props({
    __list: types.map(TagModel)
  })
  .actions(self => ({
    fetch: flow(function * () {
      const list = yield http.get('/api/tags')
      list.forEach(item => {
        self.__list.put(TagModel.create({
          id: item.id,
          tid: item.tid,
          name: item.name
        }))
      })
      list.forEach(item => {
        if (item.parent !== 'virtual') {
          const model = self.getTag(item.id)
          model.parent = self.getTag(item.parent)
        }
      })
    })
  }))
  .views(self => ({
    get list () {
      return Array.from(self.__list.values())
    },
    getTag (id) {
      return self.__list.get(id)
    },
    findByTid (tid) {
      return self.list.find(item => item.tid === tid)
    }
  }))
