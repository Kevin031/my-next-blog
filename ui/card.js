import React from 'react'
import styled from 'styled-components'
import colors from './colors'

export default function Card ({
  children,
  className,
  ...props
}) {
  const Card = styled.div`
    border: solid 1px ${colors.border};
    margin-bottom: 50px;
    background-color: #fff;
  `

  return <Card className={className}>
    { children }
  </Card>
}
