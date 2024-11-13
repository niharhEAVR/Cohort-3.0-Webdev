import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  return (
    <>
      <Clock/>
      <FetchData/>
    </>
  )
}

function Clock() {
  const [count, setCount] = useState(0)

  // read 10_useEffect.md, 11_useEffect.md, 13_cleanup_useEffect.md  and more specificly 14_cleanup.md then you will get the better understnding of useEffect and the clearInterval (with real life example)
  useEffect(()=>{
    const notification = setInterval(()=>{
      setCount(count => count + 1)
    },1000)
    return () => clearInterval(notification)
  },[])

  useEffect(() => {
    console.log(count)
  }, [count]) // this useEffect will run first on mount of the App component and from the second time it will run on count dependency means that everytime counts changes then it will run
  

  return (
    <>
      <p>{count}</p>
      <img src="https://www.iconpacks.net/icons/2/free-bell-icon-2031-thumb.png" style={{width: 40}}/> <br /><br />
    </>
  )
}

function FetchData() {
  const [currentTab, setCurrentTab] = useState("")
  const [currentTabno, setCurrentTabno] = useState(0)
  const [loading, setLoading] = useState(null)
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
    

  return(
    <>
      <button onClick={()=>{
        setCurrentTab("feed")
        setCurrentTabno(1)
      }} style={{color: currentTab=="feed"? 'red':'gray'}}>feed</button>
      <button onClick={()=>{
        setCurrentTab("notification")
        setCurrentTabno(2)
      }} style={{color: currentTab=="notification"? 'red':'gray'}}>notification</button>
      <button onClick={()=>{
        setCurrentTab("messege")
        setCurrentTabno(3)
      }} style={{color: currentTab=="messege"? 'red':'gray'}}>messege</button>
      <button onClick={()=>{
        setCurrentTab("jobs")
        setCurrentTabno(4)
      }} style={{color: currentTab=="jobs"? 'red':'gray'}}>jobs</button><br />
      {loading? "loading...":tabData.title}
    </>
  )
}

export default App
