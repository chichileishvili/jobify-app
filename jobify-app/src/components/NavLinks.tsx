import { useDashboardContext } from '../pages/Dashboard'
import { DashboardProps } from '../pages/Dashboard'
import links from '../utils/links'
import { NavLink } from 'react-router-dom'
import React, { useContext } from 'react'

export interface NavLinksProps {
  isBigSidebar?: boolean
}

const NavLinks = ({ isBigSidebar }: NavLinksProps) => {
  const { toggleSidebar, user } = useDashboardContext()
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link
        const { role } = user
        if (path === 'admin' && role !== 'admin') return
        return (
          <NavLink
            to={path}
            key={text}
            onClick={isBigSidebar ? () => {} : toggleSidebar}
            className='nav-link'
            end>
            <span className='icon'> {icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks
