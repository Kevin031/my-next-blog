import React from 'react'

export default function IconFont ({ type }) {
  return <svg className='iconfont'>
    <use xlinkHref={`#icon-${type}`} />
  </svg>
}
