import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkMzcyOWY3ZS1hNmQ4LTRlMzQtOWFiOS0xNTI2Y2RmOTdhMzUiLCJpYXQiOjE3NDEwOTAzMTB9.B0bvCN4Z87wYh8YQA_I0K61W3tOJvPSXCySlV89LJv8`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }

}


// if not understand then read 07_web_testing.md