"use client"
import axios from "axios";

export default function () {
    return <div>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="passeord" />

        <button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/badSignin", {
                username: "asd",
                password: "asdkabaap"
            })
            localStorage.setItem("token", response.data.token)
        }}>Signin</button>

    </div>
}