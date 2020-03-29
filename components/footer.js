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
`

export default inject('appStore')(function Footer ({ appStore }) {
  if (typeof window === 'undefined') {
    appStore.setRenderTime(Date.now() - getRequestTime())
  }
  return <Wrapper>
    <p>Power by nextjs</p>
    <p>本次首屏构建耗时: {appStore.formatRenderTime}</p>
    <p>©2017-2020 | 粤ICP备20019685号</p>
  </Wrapper>
})
