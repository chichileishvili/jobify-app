import { Outlet } from 'react-router-dom'
import React from 'react'

const HomeLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default HomeLayout
