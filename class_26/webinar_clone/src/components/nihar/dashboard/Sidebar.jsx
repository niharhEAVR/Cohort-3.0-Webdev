import { Link } from "react-router-dom";

export default function Sidebar({ open }) {
    return (
        <div
            className={`
        bg-gray-800 text-white h-full w-64 p-5 fixed md:static 
        transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-64"} 
        md:translate-x-0
       flex flex-col justify-between `}
        >
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div className="text-xl font-bold">Icon</div>
                    <div className="font-thin bg-orange-400 rounded px-2 py-1 text-center">
                        upgrade
                    </div>
                </div>

                <ul className="space-y-4">
                    <li className="border border-blue-400 rounded px-2 py-2 text-center hover:bg-gray-700 cursor-pointer">
                        <Link to="/" className="block w-full h-full">
                            Dashboard
                        </Link>
                    </li>
                    <li className="border border-blue-400 rounded px-2 py-2 text-center hover:bg-gray-700 cursor-pointer">
                        <Link to="/webinar" className="block w-full h-full">
                            Webinar
                        </Link>
                    </li>
                    <li className="border border-blue-400 rounded px-2 py-2 text-center hover:bg-gray-700 cursor-pointer">
                        <Link to="/recordings" className="block w-full h-full">
                            Recording
                        </Link>
                    </li>
                </ul>
            </div>

            <ul>
                <Link to="/profile">
                    <li className="border border-blue-400 rounded py-3 px-2 text-center hover:bg-gray-700 list-none flex justify-between items-center cursor-pointer">
                        <div className="bg-blue-300 rounded px-3 py-2">image</div>
                        <div className="text-sky-300 px-3 py-2">name</div>
                    </li>
                </Link>
            </ul>
        </div>
    );
}
