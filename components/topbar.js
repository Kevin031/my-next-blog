import ActiveLink from './active-link'
// import HomeIcon from '@material-ui/icons/Home'
// import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
// import PersonIcon from '@material-ui/icons/Person'
// import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined'
// import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
// import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined'
import IconFont from '../components/icon-font'
import styled from 'styled-components'
import colors from '../ui/colors'
import Link from 'next/link'

const HEIGHT = 54

const StyledWrapper = styled.div`
  height: ${HEIGHT}px;
  .fixed-topbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    border-bottom: solid 1px #ddd;
    background-color: #fff;
  }
  .inner {
    display: flex;
    height: ${HEIGHT}px;
    align-items: center;
    justify-content: space-between;
  }
  .brand {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    font-weight: 600;
    a {
      position: relative;
      color: ${colors.text};
      &:hover {
        text-decoration: none;
      }
    }
  }
  .links {
  }
  .links a {
    margin-left: 10px;
    color: rgba(38, 38, 38);
    font-size: 20px;
    .active {
      display: none;
    }
    &.active {
      .active {
        display: inline;
      }
      .unactive {
        display: none;
      }
    }
  }
`

const rightMenu = [
  {
    title: 'Home',
    link: '/',
    activeIcon: <IconFont type='homepage-fill' />,
    unactiveIcon: <IconFont type='homepage' />
  },
  {
    title: 'Posts',
    link: '/posts',
    activeIcon: <IconFont type='paperdraft-fill' />,
    unactiveIcon: <IconFont type='paperdraft' />
  },
  {
    title: 'About',
    link: '/about',
    activeIcon: <IconFont type='calendar-fill' />,
    unactiveIcon: <IconFont type='calendar' />
  }
]

export const TopBar = () => {
  return <StyledWrapper className='topbar'>
    <div className='fixed-topbar'>
      <div className='container'>
        <div className='inner'>
          <div className='brand'>
            <Link href='/'>
              <a>Kevin's blog</a>
            </Link>
          </div>
          <div className='links'>
            {
              rightMenu.map((item, index) => (
                <ActiveLink href={item.link} activeClassName='active' key={index}>
                  <a alt={item.title}>
                    <span className='active'>
                      { item.activeIcon }
                    </span>
                    <span className='unactive'>
                      { item.unactiveIcon }
                    </span>
                  </a>
                </ActiveLink>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  </StyledWrapper>
}
