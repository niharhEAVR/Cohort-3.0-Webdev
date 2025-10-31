import { useState } from 'react'
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
      {/* Here is a conditional rendering happening (as we using conditions &&) read the 13_conditional_rerendering.md*/}
    </>
  )
}

export default App