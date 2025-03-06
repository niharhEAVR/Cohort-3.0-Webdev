import { useEffect, useRef } from "react";
import { initDraw, removeDrawListeners } from "@/draw";

export function Canvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        initDraw(canvas, roomId, socket);

        return () => {
            removeDrawListeners(canvas);
        };
    }, [roomId, socket]); // Dependencies added

    return (
        <div className="flex justify-center items-center flex-col h-screen bg-gray-900">
            <div className="flex gap-x-5 mt-5">
                <button className="rounded bg-white text-black p-2">Text</button>
                <button className="rounded bg-white text-black p-2">Circle</button>
                <button className="rounded bg-white text-black p-2">Pencil</button>
                <button className="rounded bg-white text-black p-2">Rectangle</button>
            </div>
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <canvas
                    ref={canvasRef}
                    className="border-2 border-gray-700 rounded-lg shadow-lg"
                    width={900}
                    height={700}
                />
            </div>
        </div>
    );
}
