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
import { action as loginAction } from './pages/Login'
import { action as registerAction } from './pages/Register'
import { loader as dashboardLoader } from './pages/Dashboard'
import { action as addJobAction } from './pages/AddJob'
import { loader as allJobLoader } from './pages/AllJobs'
import { action as editJobAction } from './pages/EditJob'
import { loader as editJobLoader } from './pages/EditJob'
import { action as deleteJobAction } from './pages/DeleteJob'
import { loader as adminPageLoader } from './pages/Admin'
import { action as profileAction } from './pages/Profile'
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
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,

        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction,
          },
          { path: 'admin', element: <Admin />, loader: adminPageLoader },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            action: editJobAction,
            loader: editJobLoader,
          },
          { path: 'delete-job/:id', action: deleteJobAction },
        ],
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
