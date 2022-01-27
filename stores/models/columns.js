import { types, flow, getRoot } from 'mobx-state-tree'
import http from '../../services/http'

const ColumnModel = types
  .model('Column')
  .props({
    id: types.identifier,
    tid: types.number,
    name: types.string,
    field_key: types.maybeNull(types.string),
    parent: types.maybeNull(types.reference(types.late(() => ColumnModel))),
  })
  .views(self => ({
    get root() {
      return getRoot(self)
    },
    get children() {
      return self.root.list.filter(item => item.parent && item.parent.id === self.id)
    },
  }))

export const ColumnStore = types
  .model('ColumnStore')
  .props({
    __list: types.map(ColumnModel),
  })
  .actions(self => ({
    fetch: flow(function* () {
      const list = yield http.get('/api/columns')
      list.forEach(item => {
        self.__list.put(
          ColumnModel.create({
            id: item.id,
            tid: item.tid,
            name: item.name,
            field_key: item.field_key,
          }),
        )
      })
      list.forEach(item => {
        if (item.parent !== 'virtual') {
          const model = self.getColumn(item.id)
          model.parent = self.getColumn(item.parent)
        }
      })
    }),
  }))
  .views(self => ({
    get list() {
      return Array.from(self.__list.values())
    },
    get rootList() {
      return self.list.filter(item => !item.parent)
    },
    getColumn(id) {
      return self.__list.get(id)
    },
  }))
