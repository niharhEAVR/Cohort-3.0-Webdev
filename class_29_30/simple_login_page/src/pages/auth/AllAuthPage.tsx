import  LoginPage  from "./LoginPage"
import  SignUpPage  from "./SignUpPage";
import { Routes, Route } from "react-router-dom";


export default function Component() {
    return (<>
        <Routes>
            <Route path="/login" element={<div className="h-screen w-screen bg-gray-700 flex justify-center items-center flex-wrap"><LoginPage/></div>} />
            <Route path="/signup" element={<div className="h-screen w-screen bg-gray-700 flex justify-center items-center flex-wrap"><SignUpPage/></div>} />
        </Routes>
    </>)
}