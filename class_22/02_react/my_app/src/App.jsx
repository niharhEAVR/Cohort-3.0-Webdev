import { useState, useEffect } from 'react'
import './App.css'
import './custom_hooks/useFetch'
import { useFetch } from './custom_hooks/useFetch'

function App() {
  const [pages, setPages] = useState(1)
  
  const {post ,loading}= useFetch("https://jsonplaceholder.typicode.com/posts/"+pages) // we created our custom hook and destructuring it


  if (loading) {
    return <div>
      Loading...
    </div>
  }

  return (
    <>
    <button onClick={()=>{setPages(c=>c+1)}}>click to change page no: {pages}</button>
    <br /><br />
      {JSON.stringify(post)}
    </>
  )
}

export default App
