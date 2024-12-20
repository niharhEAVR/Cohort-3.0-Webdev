"use client"

import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="border p-2 flex gap-2">
            <input type="text" className="text-black" placeholder="username" onChange={e => {
                setUsername(e.target.value);
            }}></input>
            <input type="password" className="text-black" placeholder="password" onChange={e => {
                setPassword(e.target.value)
            }}></input>

            <button onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/signup", {
                    username,
                    password
                })

                alert(response.data.message)
                router.push("/user/signin")
            }} className="hover:bg-white hover:text-black border p-2">Sign up</button>
        </div>

    </div>
}