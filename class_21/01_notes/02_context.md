```jsx
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
```


### Q. what is context in react and why its better then prop drilling and explain this code , what is provider, and why we wrap <Lightbulb/> with <bulbContext.Provider>


### What is Context in React?

In React, **Context** provides a way to share data across components without passing props explicitly through each level of the component tree, which is often called **prop drilling**. Prop drilling can be problematic in larger applications where data needs to be shared by multiple nested components because it involves passing props through several intermediary components that don’t directly need the data.

The Context API is better than prop drilling because:
1. It reduces the need to pass props down manually through each level of nested components, making code cleaner and easier to maintain.
2. It enables easier data sharing across deeply nested components, simplifying state management and data flow.

### Explanation of the Code

In your code, the **Context API** is used to manage and share the state of `isBulbOn` (whether the bulb is on or off) between components without prop drilling.

Here’s a breakdown of the code:

1. **Creating Context**:
   ```javascript
   const bulbContext = React.createContext();
   ```
   - `bulbContext` is created using `React.createContext()`. This object will contain the data that needs to be shared across components. It has two main parts:
     - `Provider`: Used to provide the context data to components.
     - `Consumer`: (Optional) Used to consume context data in class components, but here you’re using `useContext`, which is simpler in function components.

2. **Using Provider**:
   ```javascript
   <bulbContext.Provider value={{ bulbOn: isBulbOn, setBulbOn: setisBulbOn }}>
       <Lightbulb />
   </bulbContext.Provider>
   ```
   - The `Provider` component is used to "provide" or make the context data available to all components within it.
   - Here, `bulbContext.Provider` is wrapping `<Lightbulb />`. This means that any child component of `<Lightbulb />` will be able to access `bulbOn` and `setBulbOn` without the need to pass them down as props.
   - The `value` prop on the `Provider` supplies the data we want to share (`bulbOn` state and `setBulbOn` function).

3. **Using useContext Hook**:
   - In both the `Bulb` and `ToggleBulb` components, the `useContext` hook is used to access the context data. This hook allows functional components to access data from the nearest matching `Provider`.

   ```javascript
   const { bulbOn, setBulbOn } = useContext(bulbContext);
   ```

   - By calling `useContext(bulbContext)`, you’re directly accessing `bulbOn` and `setBulbOn` without needing to pass these as props from `App` down to `Lightbulb`, `Bulb`, and `ToggleBulb`.

4. **Bulb Component**:
   ```javascript
   function Bulb() {
       const { bulbOn } = useContext(bulbContext);
       return (
           <>
               {bulbOn ? (<img src="https://clipart-library.com/images/di9XjpXAT.png" style={{ width: 80 }} />) : (<img src="https://openclipart.org/image/800px/48391" style={{ width: 50 }} />)}
           </>
       );
   }
   ```
   - `Bulb` reads `bulbOn` from the context to display the appropriate image based on the current state of the bulb (on or off).

5. **ToggleBulb Component**:
   ```javascript
   function ToggleBulb() {
       const { bulbOn, setBulbOn } = useContext(bulbContext);
       return (
           <>
               <button onClick={() => setBulbOn(!bulbOn)}>toggle bulb</button>
           </>
       );
   }
   ```

---

Yes, it is destructuring the returned object. When you use `useContext(bulbContext)`, it returns the entire `value` object provided by `<bulbContext.Provider>`, which contains `{ bulbOn: isBulbOn, setBulbOn: setisBulbOn }`.

By using:
```javascript
const { bulbOn, setBulbOn } = useContext(bulbContext);
```
you’re destructuring that returned object directly into `bulbOn` and `setBulbOn` variables, making it easy to access the individual properties from the context without having to refer to them as `context.bulbOn` or `context.setBulbOn`.

---

   - `ToggleBulb` uses both `bulbOn` and `setBulbOn` from the context.
   - It renders a button that toggles the bulb state by calling `setBulbOn(!bulbOn)`.

### Why We Wrap `<Lightbulb />` with `<bulbContext.Provider>`

By wrapping `<Lightbulb />` with `<bulbContext.Provider>`, we ensure that every component inside `<Lightbulb />` and its children (e.g., `Bulb` and `ToggleBulb`) has access to the context values (`bulbOn` and `setBulbOn`). Without this wrapping, the context would not be available to these nested components, and we would have to use prop drilling to share the state and function, which is precisely what the Context API helps to avoid.

Using Context API with the `Provider` and `useContext` makes the code cleaner, more modular, and easier to understand, especially as the app grows in complexity.


