import { useRef, type Dispatch, type SetStateAction } from "react";
import './scrollbar.css';

interface Msg {
    text: string;
    self: boolean;
}

interface FrontendProps {
    messages: Msg[];
    ws: React.MutableRefObject<WebSocket>;
    setSrc: Dispatch<SetStateAction<string | null>>;
    setMessages: Dispatch<SetStateAction<Msg[]>>;
}


function Frontend(props: FrontendProps) {

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className="w-screen h-screen bg-stone-900 flex justify-center items-center flex-col gap-4">
                <div className="border-2 border-white rounded-xl h-[50vh] w-[50vw] p-2 flex flex-col gap-2">
                    {/* Content Section */}
                    <div className="border-2 border-white rounded-xl grow p-3 flex flex-col gap-4 text-white overflow-auto custom-scrollbar">
                        {props.messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`w-full flex ${msg.self ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`px-3 py-2 rounded-lg max-w-[70%] ${msg.self ? "bg-blue-600" : "bg-gray-700"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Input and Button */}
                    <div className="shrink flex flex-col justify-between p-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                className="flex-grow border-2 border-white rounded-lg bg-stone-800 text-white p-2 outline-none placeholder-gray-400"
                                placeholder="Type a message..."
                                ref={inputRef}
                            />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                onClick={() => {
                                    const msg = inputRef.current?.value;

                                    // Add self message to UI (right side)
                                    props.setMessages(prev => [...prev, { text: msg!, self: true }]);

                                    props.ws.current.send(JSON.stringify({
                                        type: "chat",
                                        payload: {
                                            message: msg
                                        }
                                    }));

                                    inputRef.current!.value = "";

                                }}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        props.ws.current.send(JSON.stringify({ type: "leave" }));
                        props.setSrc(null);
                    }}
                    className="border-4 rounded-xl p-2 bg-sky-200 text-black font-bold"
                >
                    Leave Room
                </button>

            </div>
        </>
    )
}

export default Frontend