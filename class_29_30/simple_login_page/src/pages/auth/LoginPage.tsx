import { useState } from "react";
import { useBackend } from "../../context/BackendContext";


export default function Component() {
    const [uval, setUVal] = useState("");
    const [pval, setPVal] = useState("");
    const { url, ves } = useBackend(); // custom or inbuilt Hooks always should be called inside the main export function or react components, not in normal function




    return (<>
        <h1>Hello Component</h1>
        <h2>{url}/{ves}/signin</h2>
        username:<input type="text" onChange={(e) => { setUVal(e.target.value) }} />
        password:<input type="text" onChange={(e) => { setPVal(e.target.value) }} />
        <button>Login</button>

        <br />
        {uval}
        <br />
        {pval}
    </>)
}