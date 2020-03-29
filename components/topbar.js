import ActiveLink from './active-link'
import HomeIcon from '@material-ui/icons/Home'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import PersonIcon from '@material-ui/icons/Person'
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined'
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
    font-family: fantasy;
    font-size: 24px;
    font-weight: bold;
    a {
      position: relative;
      top: 3px;
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
    activeIcon: <HomeIcon style={{ fontSize: 28 }} />,
    unactiveIcon: <HomeOutlinedIcon style={{ fontSize: 28 }} />
  },
  {
    title: 'Posts',
    link: '/posts',
    activeIcon: <LibraryBooksIcon style={{ fontSize: 28 }} />,
    unactiveIcon: <LibraryBooksOutlinedIcon style={{ fontSize: 28 }} />
  },
  {
    title: 'About',
    link: '/about',
    activeIcon: <PersonIcon style={{ fontSize: 28 }} />,
    unactiveIcon: <PersonOutlinedIcon style={{ fontSize: 28 }} />
  }
]

export const TopBar = () => {
  return <StyledWrapper className='topbar'>
    <div className='fixed-topbar'>
      <div className='container'>
        <div className='inner'>
          <div className='brand'>
            <Link href='/'>
              <a>KEVINLAUA</a>
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
