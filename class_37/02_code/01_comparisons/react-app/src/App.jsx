import axios from 'axios'
import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState();

  useEffect(() => {
    const fetchData = async()=>{
      await new Promise(x=>setTimeout(x,5000))
      await axios.get("https://api.github.com/users/Nihar-Debnath").then(response=>{
        setData(response.data);
        setLoading(false);
      })
    }
    fetchData();
  }, [])

  if(loading){
    return(<>
    <div>loading...</div>
    </>)
  }
  

  return (
    <>
      <div>
        <div >Name: {data.name}</div>
        <img src={data.avatar_url} alt="image" style={{width:"200px",height:"200px"}}/>
      </div>
      <h1>Open the network tab and ckeck & observe the html response</h1>
    </>
  )
}

export default App