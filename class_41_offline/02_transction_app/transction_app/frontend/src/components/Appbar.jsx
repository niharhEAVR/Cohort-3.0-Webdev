import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const name = localStorage.getItem("name") || "User";
  const navigate = useNavigate();

  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="shadow-md h-16 flex justify-between items-center px-6 bg-white rounded-xl">
      
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
          {firstLetter}
        </div>

        <h1 className="text-lg font-semibold text-gray-700">
          Hello, <span className="text-blue-600">{name}</span>
        </h1>
      </div>

      {/* Right Side */}
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
      >
        Pay Someone
      </button>
    </div>
  );
};