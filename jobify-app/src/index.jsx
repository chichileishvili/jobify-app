import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import './assets/css/index.css'
import App from './App'
import axios from 'axios'
import customFetch from './utils/customFetch'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const data = await customFetch.get('/test')
console.log(data)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer position='top-center' />
  </React.StrictMode>
)
