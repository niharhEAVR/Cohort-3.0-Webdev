import { useNavigate } from "react-router-dom"

export default function Component() {
    const navigate = useNavigate();
    return (<>
        <h1>Hello Component</h1>
        <button onClick={() => navigate("login")}>Click to Login Page</button>
        <button onClick={() => navigate("signup")}>Click to Signup Page</button>
    </>)
}