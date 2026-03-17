import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded shadow max-w-lg mx-auto mt-6">
          <h2 className="text-xl font-bold mb-4">My Profile</h2>
          {user ? (
            <div>
              <p><span className="font-bold">Username:</span> {user.userName}</p>
              <p><span className="font-bold">Email:</span> {user.email}</p>
              <p><span className="font-bold">Bio:</span> {user.bio || "No bio yet"}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile