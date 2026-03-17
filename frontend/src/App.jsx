import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import CreatePost from "./pages/CreatePost"
import Profile from "./pages/Profile"
function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </BrowserRouter>
  )
}
export default App 