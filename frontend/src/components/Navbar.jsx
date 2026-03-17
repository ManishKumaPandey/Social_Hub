import { useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" 
          onClick={() => navigate("/")}>
        Social Hub
      </h1>
      <div className="flex gap-4">
        <button onClick={() => navigate("/create-post")}
          className="bg-white text-blue-600 px-3 py-1 rounded font-semibold">
          + Post
        </button>
        <button onClick={() => navigate("/profile")}
          className="bg-white text-blue-600 px-3 py-1 rounded font-semibold">
            Profile
        </button>
        <button onClick={handleLogout}
          className="bg-white text-blue-600 px-3 py-1 rounded font-semibold">
          Logout
        </button>
        
      </div>
    </nav>
  )
}

export default Navbar;