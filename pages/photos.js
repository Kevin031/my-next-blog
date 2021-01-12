import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout'
import { inject, observer } from 'mobx-react'

const Photos = ({
  postStore,
  columnStore,
  tagStore,
  baseLink,
  params
}) => {
  const columns = columnStore.list.filter(item => item.parent && item.parent.id === params.id).map(item => item.id).concat(params.id)

  return <Layout>
    <div>开发中...</div>
  </Layout>
}

Photos.getInitialProps = async ({ query, mobxStore }) => {
  let { tags, ...params } = query
  if (typeof window === 'undefined') {
    await Promise.all([
      mobxStore.columnStore.fetch(),
      mobxStore.tagStore.fetch()
    ])
    const columns = mobxStore.columnStore.list.filter(item => item.parent && item.parent.id === params.id).map(item => item.id).concat(params.id)
    await mobxStore.postStore.fetch({ columns })
  }
  return {
    params,
    baseLink: {
      href: `/photos?id=${params.id || ''}`,
      as: '/photos' + (params.id ? `/${params.id}` : '')
    }
  }
}

export default inject('postStore', 'columnStore', 'tagStore')(observer(Photos))
