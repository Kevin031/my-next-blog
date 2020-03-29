import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import http from '../services/http'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import Markdown from 'markdown-to-jsx'
import Skeleton from '@material-ui/lab/Skeleton'
import { Waypoint } from 'react-waypoint'
import { Layout } from '../components/layout'
import Link from 'next/link'
import Card from '../ui/card'
import cx from 'classnames'
import colors from '../ui/colors'
import IconFont from '../components/icon-font'
import MdContent from '../components/md-content'

const Article = styled.article`
  .header {
    padding: 16px;
  }

  .title {
    /* font-weight: normal; */
    margin-bottom: 0;
    a {
      color: inherit;
      &:hover {
        text-decoration: none;
      }
    }
  }

  .body {
    padding: 16px;
    *:not(pre),
    *:not(code) {
      font-size: 14px;
      color: #262626;
    }
    img {
      width: 100%;
    }
  }

  .tags {
    padding: 0 16px;
    a {
      margin-right: 12px;
      font-size: 14px;
      &:before {
        content: '#';
      }
    }
  }

  .meta {
    padding: 8px 16px 16px;
    .create-time {
      font-size: 12px;
      color: #999;
    }
  }
`

const ColumnArea = styled(Card)`
  padding: 16px;
  .title {
    color: rgb(142, 142, 142);
    margin-bottom: 10px;
  }
  .reset {
    font-size: 12px;
    font-weight: bold;
    color: ${colors.text};
    &:hover {
      text-decoration: none;
    }
  }
  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    a {
      font-size: 14px;
      color: inherit;
      &:hover {
        text-decoration: none;
      }
      svg {
        margin-right: 6px;
      }
      &.active {
        font-weight: bold;
      }
    }
  }
`

const TagArea = styled(Card)`
  padding: 16px;
  .title {
    color: ${colors.secondary};
    margin-bottom: 16px;
  }
  .reset {
    font-size: 12px;
    font-weight: bold;
    color: ${colors.text};
    &:hover {
      text-decoration: none;
    }
  }
  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    margin-right: 14px;

    a {
      display: block;
      font-size: 12px;
      color: inherit;
      padding: 0px 12px;
      background-color: #f2f2f2;
      line-height: 24px;
      margin-bottom: 10px;
      border-radius: 12px;
      &:hover {
        text-decoration: none;
        background-color: #f0f0f0;
      }
      &.active {
        color: #fff;
        background-color: ${colors.highlight};
      }
    }
  }
`

const EmptyPlaceholder = styled(Card)`
  .inner {
    padding: 30px 0;
  }
  .icon {
    font-size: 30px;
    border-radius: 50%;
    border: solid 1px ${colors.text};
    width: 50px;
    height: 50px;
    line-height: 45px;
    text-align: center;
  }
  .title {
    font-size: 14px;
    margin-bottom: 0;
  }
`

let _ready = false

const Posts = ({
  postStore,
  columnStore,
  tagStore,
  tags,
  baseLink,
  params
}) => {
  const columns = columnStore.list.filter(item => item.parent && item.parent.id === params.id).map(item => item.id).concat(params.id)

  useEffect(() => {
    if (_ready) {
      postStore.init()
    }
    _ready = true
  }, [params.id])

  const _renderPost = (item) => {
    return <Card key={item.id}>
      <Article>
        <div className='header'>
          <h6 className='title'>
            <Link href={`/post?id=${item.id}`} as={`/post/${item.id}`}>
              <a>{item.title}</a>
            </Link>
          </h6>
        </div>
        <div className='body'>
          <MdContent content={item.abstract} />
        </div>
        <div className='tags'>
          {
            item.tags.map(tag => (
              <Link key={tag.id} href={_makeTagLink(tag).href} as={_makeTagLink(tag).as}>
                <a>{tag.name}</a>
              </Link>
            ))
          }
        </div>
        <div className='meta'>
          <span className='create-time'>{item.formattedCreatedTime}</span>
        </div>
      </Article>
    </Card>
  }

  const _renderPendingCard = () => {
    return <Waypoint onEnter={() => postStore.fetch({ columns })}>
      <div>
        <Card>
          <Article>
            <div className='header'>
              <Skeleton variant='text' />
            </div>
            <div className='body'>
              <Skeleton variant='rect' height={200} />
            </div>
            <div className='meta'>
              <Skeleton variant='rect' height={18} width={80} />
            </div>
          </Article>
        </Card>
      </div>
    </Waypoint>
  }

  const _makeTagLink = ({ tid }) => {
    const { id, ...others } = params
    const queryStr = http.buildQuery({
      ...others,
      tags: (tags.includes(tid) ? tags.filter(id => id !== tid) : tags.concat(tid)).join('-')
    })
    return {
      href: `${baseLink.href}&${queryStr}`,
      as: `${baseLink.as}?${queryStr}`
    }
  }

  const _renderSidebar = () => {
    const columnList = params.id ? columnStore.getColumn(params.id).children : columnStore.rootList
    return <div>
      <ColumnArea className='columns'>
        <div className='title d-flex align-items-end justify-content-between'>
          <h6 className='mb-0'>专栏</h6>
          <Link href='/posts'>
            <a className='reset'>查看全部</a>
          </Link>
        </div>
        <ul>
          {
            columnList.map(item => (
              <li key={item.id}>
                <Link href={`/posts?id=${item.id}`} as={`/posts/${item.id}`}>
                  <a className={cx({ 'active': item.id === params.id })}>
                    <IconFont type={item.field_key} />
                    <span>{item.name}</span>
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
      </ColumnArea>
      <TagArea className='tags'>
        <div className='title d-flex align-items-end justify-content-between'>
          <h6 className='mb-0'>标签</h6>
          <Link href={baseLink.href} as={baseLink.as}>
            <a className='reset'>重置</a>
          </Link>
        </div>
        <ul>
          {
            tagStore.list.map(item => (
              <li key={item.id}>
                <Link href={_makeTagLink(item).href} as={_makeTagLink(item).as}>
                  <a className={cx({ 'active': tags.includes(item.tid) })}>{item.name}</a>
                </Link>
              </li>
            ))
          }
        </ul>
      </TagArea>
    </div>
  }

  const _renderEmptyPlaceholder = () => {
    return <EmptyPlaceholder>
      <div className='inner d-flex flex-column align-items-center'>
        <p className='icon'>
          <IconFont type='empty' />
        </p>
        <p className='title'>暂无内容</p>
      </div>
    </EmptyPlaceholder>
  }

  const list = postStore.getFilteredList({
    tags,
    columns
  })

  return <Layout
    sidebarContent={_renderSidebar()}
    sidebarShow={true}
  >
    { list.map(_renderPost) }
    { postStore.status !== 'done' && _renderPendingCard() }
    { postStore.status === 'done' && list.length === 0 && _renderEmptyPlaceholder() }
  </Layout>
}

Posts.getInitialProps = async ({ query, mobxStore }) => {
  let { tags, ...params } = query
  tags = tags ? Array.from(tags.split('-'), id => parseInt(id)) : []
  if (typeof window === 'undefined') {
    await Promise.all([
      mobxStore.columnStore.fetch(),
      mobxStore.tagStore.fetch()
    ])
    const columns = mobxStore.columnStore.list.filter(item => item.parent && item.parent.id === params.id).map(item => item.id).concat(params.id)
    await mobxStore.postStore.fetch({ columns })
  }
  return {
    tags,
    params,
    baseLink: {
      href: `/posts?id=${params.id || ''}`,
      as: '/posts' + (params.id ? `/${params.id}` : '')
    }
  }
}

export default inject('postStore', 'columnStore', 'tagStore')(observer(Posts))
