// import { Otp } from "./components/otp"
import { Otp } from "./components/otp2"

function App() {
    return (
        <> <div className="h-screen w-screen m-0 bg-gray-600 flex justify-center items-center">
            <div className="h-2/5 w-2/5 rounded-3xl p-2 bg-card border hover:shadow-lg transition-all duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)] flex justify-center items-center flex-col ">
                <p className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Enter Verification Code</p>
                <Otp />
                <button className="inline-flex items-center px-8 mt-2 bg-slate-500 rounded h-10 hover:bg-slate-300" type="submit">Verify</button>
            </div>
        </div>
        </>
    )
}

export default App