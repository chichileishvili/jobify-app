import { Routes, Route, Link, createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  DashboardLayout,
  Register,
  Error,
  Landing,
  AllJobs,
  AddJob,
  Login,
  EditJob,
  Stats,
  Profile,
  HomeLayout,
  Admin,
} from './pages'

import { action as registerAction } from './pages/Register'
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)

  return isDarkTheme
}
checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,

        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          { path: 'admin', element: <Admin /> },
        ],
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
