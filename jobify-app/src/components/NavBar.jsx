import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft } from 'react-icons/fa'
import Logo from './Logo'
import { useDashboradContext } from '../pages/Dashboard'
import LogoutContainer from './LogoutContainer'
import ThemeToggle from './ThemeToggle'

const NavBar = () => {
  const { toggleSidebar } = useDashboradContext()
  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn' type='button' onClick={toggleSidebar}>
          {' '}
          <FaAlignLeft />
        </button>
        <div>
          {' '}
          <Logo />
          <h4 className='logo-text'> dashboard</h4>
        </div>
        <div className='btn-container'>
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  )
}

export default NavBar
