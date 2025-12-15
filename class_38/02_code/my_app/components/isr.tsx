"use client"
import Link from "next/link"

export default function ISR() {
    return (
        <div>
            <Link href="08_isr/without" className="border p-3  rounded-xl font-bold hover:bg-slate-900 m-2" onClick={() => alert("On Dev Mode this will not work, first build the whole app then do check (npm run build > npm run start)")}>http://localhost:3000/08_isr/without</Link>
            <Link href="08_isr/with" className="border p-3  rounded-xl font-bold hover:bg-slate-900 m-2" onClick={() => alert("On Dev Mode this will not work, first build the whole app then do check (npm run build > npm run start)")}>http://localhost:3000/08_isr/with</Link>
        </div>
    )
}