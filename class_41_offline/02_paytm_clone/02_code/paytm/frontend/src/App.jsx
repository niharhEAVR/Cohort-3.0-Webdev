import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

function App() {
  return (
    <>
    <div className="bg-gray-400 h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendMoney />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

function Layout() {
  return <div>
    <Link to="/">Home Page</Link>
    |
    <Link to="/signup">Signup</Link>
    |
    <Link to="/signin">Signin</Link>
    <Outlet />
  </div>
}


export default App