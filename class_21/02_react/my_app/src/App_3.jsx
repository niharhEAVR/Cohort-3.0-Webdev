// Aother example of useContext to manage a counter state across multiple components
import { createContext, useContext, useState } from 'react';
import './App.css'

const CountContext = createContext();

function CountContextProvider({ children }) {
    const [count, setCount] = useState(0);

    return <CountContext.Provider value={{ count, setCount }}>
        {children}
    </CountContext.Provider>
}

function Parent() {
    return (
        <CountContextProvider>
            <Incrase />
            <Decrease />
            <Value />
        </CountContextProvider>
    );
}

function Decrease() {
    const { count, setCount } = useContext(CountContext);
    return <button onClick={() => setCount(count - 1)}>Decrease</button>;
}

function Incrase() {
    const { count, setCount } = useContext(CountContext);
    return <button onClick={() => setCount(count + 1)}>Increase</button>;
}

function Value() {
    const { count } = useContext(CountContext);
    return <p>Count: {count}</p>;
}

export default function App() {
    return <div>
        <Parent />
    </div>
};