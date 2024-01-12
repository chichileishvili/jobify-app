import Wrapper from '../assets/wrappers/SmallSidebar'
import { toggleSideBar } from '../store/dahsboard/dashboardReducer'
import { FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import NavLinks from './NavLinks'
import React from 'react'
import { RootState } from '../store/rootReducer'
const SmallSideBar: React.FC = () => {
  const dispatch = useDispatch()

  const toggleSidebar = () => {
    dispatch(toggleSideBar())
  }
  const isShowSideBar = useSelector((state: RootState) => state.dashboard.sideBar)

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
