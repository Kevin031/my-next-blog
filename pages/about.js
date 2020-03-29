import Head from 'next/head'
import { Layout } from '../components/layout'
import Card from '../ui/card'
import styled from 'styled-components'

const Wrapper = styled(Card)`
  padding: 16px;
  font-size: 14px;
`

const About = () => {
  return <Layout>
    <Head>
      <title>关于 | KEVINLAUA</title>
    </Head>
    <Wrapper>
      <h6>关于</h6>
      <p>过气文青，<br />不专业摄影师，<br />游戏爱好者，<br />程序汪，<br />极简主义，<br />强迫症患者</p>
      <p>毕业2年，坐标广州，目前在创业公司搬砖。</p>
      <p>本博客主要自用，内容并非完全原创。</p>
      <p>如果有朋友发现了本博客的文章，并且对文章产生疑问和思考，也暂时不能留言（留言板开发中）。</p>
      <p>Email: kevin019@163.com</p>
    </Wrapper>
  </Layout>
}

About.getInitialProps = () => {
  return { ok: true }
}

export default About
