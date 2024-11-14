import { useState, useEffect } from 'react'
import './App.css'

import {useDebounce} from './custom_hooks/useDebounce'

function App() {
  function sendDataToBackend() {
    fetch("api.amazon.com/search")
  }

  const deBouncedFunc = useDebounce(sendDataToBackend)

  return (
    <>
    <input type="text" onChange={deBouncedFunc}/>
    <h3>Open the Network tab and type really fast, after you stop typing then you will see that a demo request goes to the backend</h3>
    </>
  )
}

export default App
