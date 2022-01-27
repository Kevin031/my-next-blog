import { PostStore } from './models/posts'
import { ColumnStore } from './models/columns'
import { TagStore } from './models/tags'
import { AppStore } from './models/app'
import { PhotoStore } from './models/photos'

const config = {
  postStore: PostStore,
  columnStore: ColumnStore,
  tagStore: TagStore,
  appStore: AppStore,
  photoStore: PhotoStore,
}

export default config
