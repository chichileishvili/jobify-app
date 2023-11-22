import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import './assets/css/index.css'
import App from './App'

fetch('/api/v1/test')
  .then((res) => res.json())
  .then((data) => console.log(data))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
