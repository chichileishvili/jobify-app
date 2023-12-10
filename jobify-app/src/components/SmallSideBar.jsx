import Wrapper from '../assets/wrappers/SmallSidebar'
import { toggleSideBar } from '../store/dahsboard/dashboardReducer'
import { FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import NavLinks from './NavLinks'
const SmallSideBar = () => {
  const dispatch = useDispatch()

  // const { showSideBar, toggleSidebar } = useDashboradContext()
  const toggleSidebar = () => {
    dispatch(toggleSideBar())
  }
  const isShowSideBar = useSelector((state) => state.dashBoard.sideBar)

  console.log(isShowSideBar)
  return (
    <Wrapper>
      <div className={isShowSideBar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
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
