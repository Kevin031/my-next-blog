import { PostStore } from './models/posts'
import { ColumnStore } from './models/columns'
import { TagStore } from './models/tags'
import { AppStore } from './models/app'

const config = {
  postStore: PostStore,
  columnStore: ColumnStore,
  tagStore: TagStore,
  appStore: AppStore
}

export default config
