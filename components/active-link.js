import { withRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'

const ActiveLink = ({ router, children, ...props }) => {
  const child = React.Children.only(children)

  let className = child.props.className || null
  if (router.pathname === props.href && props.activeClassName) {
    className = `${className !== null ? className : ''} ${props.activeClassName}`.trim()
  }
  delete props.activeClassName

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)
