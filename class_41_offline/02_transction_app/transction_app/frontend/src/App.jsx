import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import Home from "./pages/Home";


function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route
              index
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />

            <Route
              path="signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />

            <Route
              path="signin"
              element={
                <PublicRoute>
                  <Signin />
                </PublicRoute>
              }
            />

            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="send"
              element={
                <ProtectedRoute>
                  <SendMoney />
                </ProtectedRoute>
              }
            />

          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboardRoute = ["/dashboard", "/send"].includes(
    location.pathname
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/signin", { replace: true });
  };
 

  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

        <h1
          onClick={() => navigate(localStorage.getItem("token") ? "/dashboard" : "/")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          PayApp
        </h1>

        {!isDashboardRoute ? (
          <div className="space-x-6 text-lg">
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Signup
            </Link>
            <Link
              to="/signin"
              className="text-gray-700 font-semibold hover:underline"
            >
              Signin
            </Link>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center px-4 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-600 text-sm">
        © 2026 PayApp. All rights reserved.
      </footer>
    </div>
  );
}

export default App;