import { useBackend } from "../../context/BackendContext";

export default function Component() {
    const{url, ves} = useBackend();

    return (<>
        <h1>Hello Component</h1>
        <h2>{url}</h2>
        <h2>{ves}</h2>
    </>)
}