// Rolling up the state, unoptimal re-renders
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <div style={{ border: "2px solid white", width: "200px", height: "200px", padding: "20px" }}>
        <Lightbulb />
      </div>
    </>
  )
}

function Lightbulb() {
  const [isBulbOn, setisBulbOn] = useState(false)
  //  here we passing or rolling up the state variables in to two more components using props
  return (
    <>
      <Bulb bulbOn={isBulbOn} />
      <br /><br />
      <ToggleBulb bulbOn={isBulbOn} setBulbOn={setisBulbOn} />
    </>
  )
}
function Bulb({ bulbOn }) {
  return (
    <>
      {bulbOn ? (<img src="https://clipart-library.com/images/di9XjpXAT.png" style={{ width: 80 }} />) : (<img src="https://openclipart.org/image/800px/48391" style={{ width: 50 }} />)}
    </>
  )
}
function ToggleBulb({ bulbOn, setBulbOn }) {

  return (
    <>
      <button onClick={() => setBulbOn(!bulbOn)}>toggle bulb</button>
    </>
  )
}




export default App
