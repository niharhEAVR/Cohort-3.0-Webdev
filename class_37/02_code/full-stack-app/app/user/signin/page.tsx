"use client"

import axios from "axios"

export default function Signin() {

    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="border p-2 text-black flex gap-2">
            <input type="text" placeholder="username"></input>
            <input type="password" placeholder="password"></input>

        </div>
        <button onClick={() => {
            axios.post("http://localhost:3000/api/signin")
        }} className="hover:bg-white hover:text-black border p-2">Sign in</button>

    </div>
}