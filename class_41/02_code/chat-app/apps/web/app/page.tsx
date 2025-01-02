"use client";
import { TextInput } from "@repo/ui/inputText";
import { useRouter } from "next/navigation";
import {useState} from "react"


export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState("")

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      background: "black",
      display: "flex",
      justifyContent: "center",
      justifyItems: "center"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}>
        <div>Yellow Room = yellow</div>
        <div>Green Room = green</div>
        <div>Red Room = red</div>
        <div>Blue Room = blue</div>
        <TextInput onChange={(e:any)=>setValue(e.target.value)} size="small" placeholder="Room name"></TextInput>
        <button onClick={() => {
          router.push(`/chat/${value}`)
        }} style={{color:"black" , backgroundColor: "white", fontSize:15, borderColor: "gold", padding:3}}>Join room</button>
      </div>
    </div>
  );
}