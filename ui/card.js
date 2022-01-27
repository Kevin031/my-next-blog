import React from 'react'
import styled from 'styled-components'

export default function Card({ children, className, ...props }) {
  const Card = styled.div`
    border: solid 1px var(--color-border-secondary);
    margin-bottom: 50px;
    background-color: var(--color-bg-content);
    @media (max-width: 768px) {
      margin-bottom: 30px;
    }
  `

  return <Card className={className}>{children}</Card>
}
