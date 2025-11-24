import { useState } from "react";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(false);

  return <Level1 user={user} setUser={setUser} />;
}


function Level1({ user, setUser }) {
  return <Level2 user={user} setUser={setUser} />;
}


function Level2({ user, setUser }) {
  return <Level3 user={user} setUser={setUser} />;
}


function Level3({ user, setUser }) {
  return (
    <div className="p-4 border rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-2">Without Context API</h2>
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