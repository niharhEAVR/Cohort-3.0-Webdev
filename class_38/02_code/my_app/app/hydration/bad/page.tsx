"use client"

import { useState } from "react"

export default function Button(){
    const [first, setfirst] = useState(0)

    return(
        <div><button onClick={()=>{setfirst(x=>x+1)}}>click me:{first}</button></div>
    )
}