import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-8 animate-fadeIn">
      
      <h1 className="text-5xl font-extrabold text-blue-600 tracking-wide">
        PayApp
      </h1>

      <p className="text-gray-600 text-lg max-w-md mx-auto">
        Fast. Secure. Simple money transfers for everyone.
      </p>

      <div className="flex justify-center gap-6">
        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition transform hover:scale-105"
        >
          Get Started
        </button>

        <button
          onClick={() => navigate("/signin")}
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition transform hover:scale-105"
        >
          Login
        </button>
      </div>

      <div className="mt-10">
        <div className="w-40 h-40 mx-auto rounded-full bg-blue-100 animate-pulse flex items-center justify-center">
          <span className="text-4xl">💸</span>
        </div>
      </div>
    </div>
  );
}