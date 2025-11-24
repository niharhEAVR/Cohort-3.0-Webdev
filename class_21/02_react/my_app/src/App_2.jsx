import { createContext, useContext, useState } from "react";
import './App.css'


const UserContext = createContext();


export default function App() {
    const [user, setUser] = useState(false);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Level1WithContext />
        </UserContext.Provider>
    );
}


function Level1WithContext() {
    return <Level2WithContext />;
}


function Level2WithContext() {
    return <Level3WithContext />;
}


function Level3WithContext() {
    const { user, setUser } = useContext(UserContext);


    return (
        <div className="p-4 border rounded-2xl shadow mt-4">
            <h2 className="text-xl font-bold mb-2">With Context API</h2>
            <p>User: {user ? "Rahul" : "Guest"}</p>
            <button
                className="mt-2 p-2 rounded-xl shadow"
                onClick={() => setUser(!user)}
            >
                Change User
            </button>
        </div>
    );
}