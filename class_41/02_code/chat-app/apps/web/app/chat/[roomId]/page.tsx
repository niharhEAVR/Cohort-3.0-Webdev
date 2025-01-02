"use client"
import { TextInput } from "@repo/ui/inputText";
import { useState } from "react";

export default function () {
    const [value, setvalue] = useState("")
    return <div style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center"
    }}>
        <div>
            Chat room
        </div>
        <div>
            <TextInput onChange={(e:any)=>{setvalue(e.target.value)}}size="big" placeholder="Chat here"></TextInput>
            <button style={{ color: "black", backgroundColor: "white", fontSize: 15, borderColor: "gold", padding: 10 }}>Send</button>
        </div>
    </div>
}