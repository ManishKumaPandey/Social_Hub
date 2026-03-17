import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
function Login(){
    const [email,setEmail] = useState("")
    const [password , setPassword] = useState("")
    const navigate = useNavigate()
    const handleLogin = async (e)=>{
       e.preventDefault()
       try{
        const res = await axios.post("http://localhost:5000/api/users/login", {
            email,
            password
        })
        localStorage.setItem("token",res.data.accessToken)
        navigate("/")
       }catch(error){
        alert(error.response?.data?.message || "login failed")
       }
       
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mb-4" />
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mb-4" />
          <button type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
    )
}

export default Login;