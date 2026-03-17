import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register() {
  const [form, setForm] = useState({
    userName: "", email: "", password: "", phone: ""
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/users/register", form)
      alert("Registered successfully!")
      navigate("/login")
    } catch (error) {
      alert(error.response?.data?.message || "Register failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <input name="userName" placeholder="Username" onChange={handleChange}
            className="w-full border p-2 rounded mb-4" />
          <input name="email" placeholder="Email" onChange={handleChange}
            className="w-full border p-2 rounded mb-4" />
          <input name="phone" placeholder="Phone" onChange={handleChange}
            className="w-full border p-2 rounded mb-4" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange}
            className="w-full border p-2 rounded mb-4" />
          <button type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register