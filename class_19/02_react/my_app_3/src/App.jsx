import { useState, useEffect } from 'react'
import './App.css'

function App() {
  return (
    <>
      <FetchData />
    </>
  )
}

// if you do not understood then read the 10_code_explanation.md 

function FetchData() {
  const [currentTab, setCurrentTab] = useState("")
  const [currentTabno, setCurrentTabno] = useState(1)
  const [loading, setLoading] = useState(false)
  const [tabData, setTabdata] = useState({})

  useEffect(() => {
    setLoading(true)
    fetch("https://jsonplaceholder.typicode.com/todos/" + currentTabno)
      .then(async res => {
        const data = await res.json()
        setTabdata(data)
        setLoading(false)
      })
  }, [currentTabno])


  return (
    <>
      <div className="nav">
        <button onClick={() => {
          setCurrentTab("feed")
          setCurrentTabno(1)
        }} style={{ color: currentTab == "feed" ? 'red' : 'gray' }}>feed</button>

        <button onClick={() => {
          setCurrentTab("notification")
          setCurrentTabno(2)
        }} style={{ color: currentTab == "notification" ? 'red' : 'gray' }}>notification</button>

        <button onClick={() => {
          setCurrentTab("messege")
          setCurrentTabno(3)
        }} style={{ color: currentTab == "messege" ? 'red' : 'gray' }}>messege</button>

        <button onClick={() => {
          setCurrentTab("jobs")
          setCurrentTabno(4)
        }} style={{ color: currentTab == "jobs" ? 'red' : 'gray' }}>jobs</button>
      </div>
      {loading ? "loading..." : tabData.title}
    </>
  )
}

export default App