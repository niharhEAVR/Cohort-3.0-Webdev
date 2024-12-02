import './scrollbar.css';
function Frontend() {
    return (
        <>
            <div className="w-screen h-screen bg-stone-900 flex justify-center items-center">
                <div className="border-2 border-white rounded-xl h-[50vh] w-[50vw] p-2 flex flex-col gap-2">
                    {/* Content Section */}
                    <div className="border-2 border-white rounded-xl grow p-3 flex flex-col gap-4 text-white overflow-auto custom-scrollbar">
                        
                    </div>

                    {/* Input and Button */}
                    <div className="shrink flex flex-col justify-between p-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                className="flex-grow border-2 border-white rounded-lg bg-stone-800 text-white p-2 outline-none placeholder-gray-400"
                                placeholder="Type a message..."
                            />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Frontend