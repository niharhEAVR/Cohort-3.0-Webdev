"use client"

import axios from "axios"
import { redirect } from "next/navigation";
import { useState } from "react"

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="border p-2 flex gap-2 text-white">
            <input type="text" className="text-white" placeholder="email" onChange={e => {
                setEmail(e.target.value);
            }}></input>
            <input type="password" className="text-white" placeholder="password" onChange={e => {
                setPassword(e.target.value)
            }}></input>

            <button onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    email,
                    password
                })

                alert(response.data)
                console.log(response.data);
                
                redirect("/")
            }} className="hover:bg-white hover:text-black border p-2">Sign up</button>
        </div>

    </div>
}