import { useState } from "react"
import { useRef } from "react"

export const Otp = () => {
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()

    return <div className="flex justify-center items-center font-bold">
        <SubOtpBox reference={ref1} onDone={() => {
            ref2.current.focus()
        }} onBack ={()=>{
        }}/>
        <SubOtpBox reference={ref2} onDone={() => {
            ref3.current.focus()
        }} onBack ={()=>{
            ref1.current.focus()
        }}/>
        <SubOtpBox reference={ref3} onDone={() => {
            ref4.current.focus()
        }} onBack ={()=>{
            ref2.current.focus()
        }}/>
        <SubOtpBox reference={ref4} onDone={() => {
        }} onBack ={()=>{
            ref3.current.focus()
        }}/>

    </div>
}


function SubOtpBox({
    reference,
    onDone, 
    onBack
}) {

    const [value, setValue] = useState("")

    return <div>
        <input value={value} ref={reference} onKeyUp={(e)=>{
            if (e.key == "Backspace") {
                onBack()
                setValue("")
            }
        }} onChange={(e) => {
            const val = e.target.value
            if (val == "0" || val == "1" || val == "2" || val == "3" || val == "4" || val == "5" || val == "6" || val == "7" || val == "8" || val == "9") {
                setValue(val)
                onDone()
            }
        }} type="text" className="m-1 w-[40px] h-[50px] rounded-xl bg-slate-400 outline-none px-4 text-black" />
    </div>
}