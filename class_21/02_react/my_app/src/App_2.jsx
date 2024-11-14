// to solve the prop drilling we need context api
import { useContext, useState } from 'react'
import './App.css'

const bulbContext = React.createContext()

function App() {
    const [isBulbOn, setisBulbOn] = useState(false)
    return (
        <>
            <div style={{ border: "2px solid white", width: "200px", height: "200px", padding: "20px" }}>
                <bulbContext.Provider value={{
                    bulbOn: isBulbOn,
                    setBulbOn: setisBulbOn
                }}>
                <Lightbulb/>
                </bulbContext.Provider>
            </div>
        </>
    )
}

function Lightbulb() {
    return (
        <>
            <Bulb />
            <br /><br />
            <ToggleBulb />
        </>
    )
}
function Bulb() {
    const {bulbOn} = useContext(bulbContext)
    return (
        <>
            {bulbOn ? (<img src="https://clipart-library.com/images/di9XjpXAT.png" style={{ width: 80 }} />) : (<img src="https://openclipart.org/image/800px/48391" style={{ width: 50 }} />)}
        </>
    )
}
function ToggleBulb() {
    const {bulbOn,setBulbOn} = useContext(bulbContext)
    
    return (
        <>
            <button onClick={() => setBulbOn(!bulbOn)}>toggle bulb</button>
        </>
    )
}




export default App
