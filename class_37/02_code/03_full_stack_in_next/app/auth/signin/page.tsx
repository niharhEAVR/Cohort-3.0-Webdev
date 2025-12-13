"use client"

import axios from "axios"
import { useRef } from "react"
import { useRouter } from "next/navigation";


export default function Signin() {
    const email = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    return <div className="w-screen h-screen flex justify-center items-center flex-col">
        <div className="p-2 text-white flex gap-2">
            <input type="text" placeholder="username" className="border border-white text-white rounded-xl p-2" ref={email}></input>
            <input type="password" placeholder="password" className="border border-white text-white rounded-xl p-2" ref={password}></input>
        </div>
        <button
  onClick={async () => {
    if (!email.current || !password.current) return;

    const response = await axios.post("/api/v1/user/signin", {
      email: email.current.value,
      password: password.current.value,
    });
    console.log(response.data);
    alert("open console")
  }}
 className="hover:bg-white hover:text-black border rounded-xl p-2 text-xl font-bold">Sign in</button>
    </div>
}