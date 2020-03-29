import Head from 'next/head'
import { TopBar } from './topbar'
import MyInfoCard from './my-info-card'
import MainMenu from './main-menu'
import styled from 'styled-components'
import cx from 'classnames'
import Footer from '../components/footer'

const StyledWrapper = styled.div`
  min-height: 100vh;
  background-color: #fafafa;

  .iconfont {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .fixed-sidebar {
    position: fixed;
    top: 102px;
    left: 50%;
    margin-left: 205px;
    width: 320px;
  }
`

const Main = styled.main`
  min-height: 70vh;
`

export const Layout = ({
  children,
  sidebarShow = false,
  sidebarContent
}) => {
  return (
    <StyledWrapper>
      <Head>
        <title>Kevin's blog</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link type='image/x-icon' rel="shortcut icon" href="/static/favicon.ico" />
        <link key='bootstrap' rel='stylesheet' href='https://cdn.bootcss.com/twitter-bootstrap/4.4.1/css/bootstrap.min.css'></link>
        <link key='highlight-code' rel='stylesheet' href='/static/highlight-code.css'></link>
        <script src='http://at.alicdn.com/t/font_1495582_l867hg8mba.js'></script>
      </Head>
      <TopBar />
      <Main className='container'>
        <div className='row'>
          <div className={cx(sidebarShow ? 'col-md-8' : 'col-12')}>
            <div className='pt-5'>
              {/* <MainMenu /> */}
              { children }
            </div>
          </div>
          {
            sidebarShow && <div className='col-md-4'>
              <div className='fixed-sidebar'>
                { sidebarContent }
                {/* <MyInfoCard /> */}
                <Footer />
              </div>
            </div>
          }
        </div>
      </Main>
      {
        !sidebarShow && <Footer />
      }
    </StyledWrapper>
  )
}
