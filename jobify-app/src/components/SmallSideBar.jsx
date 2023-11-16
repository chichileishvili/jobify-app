import Wrapper from '../assets/wrappers/SmallSidebar'
import { useDashboradContext } from '../pages/Dashboard'
import { FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import links from '../utils/links'
import NavLinks from './NavLinks'
const SmallSideBar = () => {
  const { showSideBar, toggleSidebar } = useDashboradContext()

  return (
    <Wrapper>
      <div className={showSideBar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          {' '}
          <button onClick={toggleSidebar} type='button' className='close-btn'>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSideBar
