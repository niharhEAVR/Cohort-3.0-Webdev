import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // as we are creating an website thats why we are importing createRoot from react-dom

// createRoot is a prebuilt function in react

import './index.css'
import App from './App.jsx' // this is for accessing the <App />

createRoot(document.getElementById('root')).render(

  <App /> // press ctrl on keyboard and hover over it

)

// using createRoot we are getting the div element from index.html and rendering our react original code inside that div element