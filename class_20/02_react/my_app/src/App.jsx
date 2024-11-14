import { useEffect } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function App() {

  return <div>
    <h1>This text will appear in every random routes, becasue inside the BrowserRouter the route comes one by one, but outside  it is not</h1>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/neet/online-coaching-class-11" element={<Class11Program />} />
          <Route path="/neet/online-coaching-class-12" element={<Class12Program />} />
          <Route path="/" element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
}

function Layout() {
  return <div style={{ height: "60vh" }}>
    <Header />
    <div style={{ height: "47vh", border: "2px solid white" }}>
      <Outlet />
    </div>
    <Footer />
  </div>
}

function Header() {
  return <>
    <div style={{ border: "2px solid white", margin: "10px 0px" }}>

      <Link to="/">Allen</Link>
      |
      <Link to="/neet/online-coaching-class-11">Class 11</Link>
      |
      <Link to="/neet/online-coaching-class-12">Class 12</Link>
    </div>
  </>
}

function Footer() {
  return <>
    <h1 style={{ border: "2px solid white" }}>Contact | Socials</h1>
  </>
}

function Landing() {
  return <div>
    <h1>Welcome to allen</h1>
  </div>
}

function Class11Program() {
  return <div>
    <h1>NEET programs for Class 11th</h1>
  </div>
}

function Class12Program() {
  const navigate = useNavigate()

  return <div>
    <h1>NEET programs for Class 12th</h1>
    <button onClick={() => { navigate("/") }}>navigate to home page</button>
  </div>
}

export default App