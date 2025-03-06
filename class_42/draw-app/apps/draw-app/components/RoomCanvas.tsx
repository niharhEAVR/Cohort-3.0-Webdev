"use client"

import { useState, useEffect } from "react";
import { WS_URL, DEMO_TOKEN } from "@/config";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=${DEMO_TOKEN}`);

        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({ type: "join_room", roomId });
            console.log("Sending:", data);
            ws.send(data);
        };

        ws.onclose = () => {
            console.log("WebSocket Closed");
        };

        return () => {
            ws.close(); // Cleanup WebSocket on unmount
        };
    }, [roomId]); // Ensure effect re-runs if `roomId` changes

    if (!socket) {
        return <div>Connecting to Server...</div>;
    }

    return <Canvas roomId={roomId} socket={socket} />;
}
