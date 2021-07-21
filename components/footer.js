import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../ui/colors'
import { getRequestTime } from '../layer'
import { inject } from 'mobx-react'

const Wrapper = styled.footer`
  padding-bottom: 50px;
  p {
    font-size: 12px;
    color: ${colors.secondary};
    text-align: center;
    margin-bottom: 10px;
  }
  a {
    color: ${colors.secondary};
  }
`

export default inject('appStore')(function Footer ({ appStore }) {
  if (typeof window === 'undefined') {
    appStore.setRenderTime(Date.now() - getRequestTime())
  }
  return <Wrapper>
    <p>Power by nextjs <a style={{ textDecoration: 'underline' }} target="_blank" href="https://github.com/Kevin031/my-next-blog">源码:github</a></p>
    <p>本次首屏构建耗时: {appStore.formatRenderTime}</p>
    <p>©2017-{new Date().getFullYear()} | <a href='https://beian.miit.gov.cn/' target="_blank">粤ICP备20019685号</a></p>
  </Wrapper>
})
