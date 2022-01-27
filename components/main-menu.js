import Link from './active-link'
import styled from 'styled-components'

const StyledWrapper = styled.div``

const menu = [
  { title: 'Home', link: '/' },
  { title: 'Posts', link: '/posts' },
  { title: 'About', link: '/about' },
]

const MainMenu = () => {
  return (
    <StyledWrapper>
      {menu.map((item, index) => (
        <Link href={item.link} key={index} activeClassName="active">
          <a>{item.title}</a>
        </Link>
      ))}
    </StyledWrapper>
  )
}

export default MainMenu
