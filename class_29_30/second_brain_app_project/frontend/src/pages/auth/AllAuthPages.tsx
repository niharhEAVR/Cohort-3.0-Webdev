import { LoginPage } from "./LoginPage"
import { SignUpPage } from "./SignUpPage";
import { FotgotPassPage } from "./ForgotPass";
import { ResetPassPage } from "./ResetPass";
import { Routes, Route } from "react-router-dom";


export default function Component() {
    return (<>
        <Routes>
            <Route path="/login" element={<LoginPageWrapper />} />
            <Route path="/signup" element={<SignUpPageWrapper />} />
            <Route path="/forgotpass" element={<FotgotPassWrapper />} />
            <Route path="/resetpass" element={<ResetPassWrapper />} />
        </Routes>
    </>)
}


const LoginPageWrapper = () => (<div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-8"><LoginPage /></div>)
const SignUpPageWrapper = () => (<div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-8"><SignUpPage /></div>)
const FotgotPassWrapper = () => (<div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-8"><FotgotPassPage /></div>)
const ResetPassWrapper = () => (<div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-8"><ResetPassPage /></div>)
