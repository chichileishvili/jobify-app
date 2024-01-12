import { useDashboradContext } from '../pages/Dashboard'
import links from '../utils/links'
import { NavLink } from 'react-router-dom'
import React from 'react'

export interface NavLinksProps {
  isBigSidebar?: boolean
}

const NavLinks = ({ isBigSidebar }: NavLinksProps) => {
  const { toggleSidebar, user } = useDashboradContext()

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
            onClick={isBigSidebar ? null : toggleSidebar}
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
