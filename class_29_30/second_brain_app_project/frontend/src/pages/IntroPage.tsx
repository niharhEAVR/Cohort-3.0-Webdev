import { Navigate, useNavigate } from "react-router-dom";
export default function IntroPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  if(token) return(<Navigate to="/dashboard" replace />)
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-8">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-white space-y-6 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Welcome to <span className="text-blue-300">Your Second Brain</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100">
            Organize your thoughts, store knowledge, and boost productivity — all in
            one beautifully designed space built for thinkers & creators.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col gap-6 w-full max-w-sm mx-auto animate-slideUp">
          <h2 className="text-2xl font-semibold text-blue-900 text-center">
            Get Started
          </h2>
          <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-md" onClick={() => navigate("/auth/login")}>
            Login
          </button>
          <button className="w-full py-3 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium transition-all duration-200 shadow-md" onClick={() => navigate("/auth/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
