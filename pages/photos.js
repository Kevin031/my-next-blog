import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout'
import { inject, observer } from 'mobx-react'
import IconFont from '../components/icon-font'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'
import { Waypoint } from 'react-waypoint'
import ImagePreviewer from 'react-image-animated-previewer'

let _ready = false

const PhotosWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  .pic-item {
    padding: 10px;
    width: 33.33%;
  }
  .pic-wrapper {
    cursor: pointer;
    position: relative;
    /* padding-bottom: 100%; */
    height: 300px;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: contain;
      background-color: #fff;
    }
    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.3);
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
    .iconfont {
      color: #fff;
      font-size: 20px;
    }
    .like-num {
      display: flex;
      align-items: center;

      > span {
        color: #fff;
        margin-left: 4px;
      }
    }
    &:hover .mask {
      opacity: 1;
    }
  }
`

const FullScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  transition: background 0.3s ease-in-out;
  overflow: auto;
  .image-wrapper {
    position: absolute;
    transition: all 0.3s ease-in-out;
    img {
      width: 100%;
      height: auto;
    }
  }
`

const Photos = ({ photoStore, tagStore, baseLink, params }) => {
  const detailAnimateDuration = 30
  const defaultDetailPhotoStyle = {
    entering: {},
    entered: {},
    exiting: {},
    exited: {},
  }
  const detailMaskStyle = {
    entering: {
      background: 'rgba(0,0,0,0)',
    },
    entered: {
      background: 'rgba(0,0,0,0.7)',
    },
    exiting: {
      background: 'rgba(0,0,0,0.7)',
    },
    exited: {
      background: 'rgba(0,0,0,0)',
    },
  }

  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    if (_ready) {
      photoStore.init()
    }
    _ready = true
  }, [params.id])

  return (
    <Layout>
      <Waypoint onEnter={() => photoStore.fetch()}>
        <PhotosWrapper>
          {photoStore.list.map((item, idx) => {
            return (
              <div key={item.id} className="pic-item">
                <div className="pic-wrapper">
                  <ImagePreviewer src={item.url} />
                </div>
              </div>
            )
          })}
        </PhotosWrapper>
      </Waypoint>
    </Layout>
  )
}

Photos.getInitialProps = async ({ query, mobxStore }) => {
  let { tags, ...params } = query
  if (typeof window === 'undefined') {
    await mobxStore.photoStore.fetch()
  }
  return {
    params,
    baseLink: {
      href: `/photos?id=${params.id || ''}`,
      as: '/photos' + (params.id ? `/${params.id}` : ''),
    },
  }
}

export default inject('photoStore')(observer(Photos))
