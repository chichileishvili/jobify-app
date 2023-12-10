import Wrapper from '../assets/wrappers/BigSidebar'
import NavLinks from './NavLinks'
import Logo from './Logo'
import { useSelector } from 'react-redux'

const BigSideBar = () => {
  const showSideBar = useSelector((state) => state.dashBoard.sideBar)
  return (
    <Wrapper>
      <div className={showSideBar ? ' sidebar-container' : ' show-sidebar sidebar-container'}>
        <div className='content'>
          <header>
            {' '}
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSideBar
