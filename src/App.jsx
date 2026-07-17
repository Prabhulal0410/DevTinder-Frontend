import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Navbar"
import Body from "./Body"
import Login from "./Login"
import Profile from "./Profile"

function App() {

  return (
    <>

    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>


      <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <h1 className="text-5xl font-bold text-cyan-400">
        DevTinder 🚀
      </h1>
    </div>
    </>
  )
}

export default App
