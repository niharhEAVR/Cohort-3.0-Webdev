import { Link } from "react-router-dom";

export default function BottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg border-t p-3 flex justify-around gap-2">

      {/* Dashboard */}
      <Link to="/" className="w-full">
        <button className="flex flex-col items-center px-4 py-2 rounded-2xl w-full 
                         border-2 border-transparent hover:border-blue-300 transition">
          <span>🏠</span>
          <span className="text-xs">Dashboard</span>
        </button>
      </Link>

      {/* Webinar */}
      <Link to="/webinar" className="w-full">
        <button className="flex flex-col items-center px-4 py-2 rounded-2xl w-full
                         border-2 border-transparent hover:border-blue-300 transition">
          <span>🎥</span>
          <span className="text-xs">Webinar</span>
        </button>
      </Link>

      {/* Recordings */}
      <Link to="/recordings" className="w-full">
        <button className="flex flex-col items-center px-4 py-2 rounded-2xl w-full
                         border-2 border-transparent hover:border-blue-300 transition">
          <span>📼</span>
          <span className="text-xs">Recordings</span>
        </button>
      </Link>

      {/* Profile */}
      <Link to="/profile" className="w-full">
        <button className="flex flex-col items-center px-4 py-2 rounded-2xl w-full
                         border-2 border-transparent hover:border-blue-300 transition">
          <span>👤</span>
          <span className="text-xs">Profile</span>
        </button>
      </Link>

    </div>
  );
}
