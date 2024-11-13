import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() { // this App is a component
  const [count, setCount] = useState(0) // this is state

  // if you want to learn about the button working over here and second set of parentheses working read 06_notes.md
  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count} 
      </button><br /><br />
      <ToggleImage/> <br />
      <ToggleImage/> {/*this is called reusable, because one time we created that image component and now we can use it as many times as we want*/}
      {/* comment = here how you can put comment inside the return tag */}
    </>
  )
}

function ToggleImage() {
  const [isVisible, setIsVisible] = useState(false)
  return(
    <>
      <button onClick={()=> setIsVisible(isVisible => !isVisible)}>Toggle Image</button> <br />
      { isVisible && <img src="https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg"/>}
      {/* I think you are smart enough to know whats happening here because of the javascript conditional operators and it is using like this way in react conditional rerendering */}
    </>
  )
}

export default App