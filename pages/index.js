import Head from 'next/head'
import { Layout } from '../components/layout'
import Link from 'next/link'
import { inject } from 'mobx-react'
import IconFont from '../components/icon-font'
import styled from 'styled-components'
import Card from '../ui/card'

const Wrapper = styled.div`
  .section-title {
    color: var(--color-text-secondary);
  }
  section {
    margin-bottom: 30px;
    font-size: 14px;
  }
`

const ColumnCard = styled(Card)`
  .icon {
    font-size: 32px;
  }
  p {
    margin-bottom: 0;
    color: inherit;
    font-size: 14px;
  }
  a {
    display: block;
    color: inherit;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-text-main);
    &:hover {
      text-decoration: none;
    }
  }
  .releases {
    padding: 15px;
  }
`

const Home = inject(
  'columnStore',
  'appStore',
)(({ columnStore, appStore }) => {
  const getLink = column => {
    if (column.field_key === 'photo') {
      return {
        as: `/photos/${column.id}`,
        href: `/photos?id=${column.id}`,
      }
    }

    return {
      as: `/posts/${column.id}`,
      href: `/posts?id=${column.id}`,
    }
  }

  const iconMap = {
    '前端': 'frontend',
    '后端': 'backend',
    '后台': 'backend',
    '杂文': 'write',
    '摄影': 'photo',
    '数据库': 'technology'
  }

  return (
    <Layout>
      <Head>
        <title>个人文章云笔记</title>
      </Head>
      <Wrapper>
        <section>
          <h1>Welcome!</h1>
          <p>这是一个以技术帖为主的个人博客</p>
        </section>
        <section>
          <h6 className="section-title">专栏</h6>
          <div className="row">
            {columnStore.rootList.map(column => (
              <div className="col-md-4" key={column.id}>
                <ColumnCard>
                  <Link href={getLink(column).href} as={getLink(column).as}>
                    <a>
                      <div className="icon">
                        <IconFont type={iconMap[column.name]} />
                      </div>
                      <p>{column.name}</p>
                    </a>
                  </Link>
                </ColumnCard>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="row">
            <div className="col-md-6">
              <h6 className="section-title">更新日志</h6>
              <ColumnCard>
                <div className="releases" dangerouslySetInnerHTML={{ __html: appStore.releases }} />
              </ColumnCard>
            </div>
          </div>
        </section>
      </Wrapper>
    </Layout>
  )
})

Home.getInitialProps = async ({ query, mobxStore }) => {
  await mobxStore.appStore.init()
  if (typeof window === 'undefined' || mobxStore.columnStore.list) {
    await Promise.all([mobxStore.columnStore.fetch(), mobxStore.tagStore.fetch()])
  }
  return { ok: true }
}

export default Home
