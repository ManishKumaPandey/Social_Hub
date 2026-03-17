import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

function CreatePost() {
  const [content, setContent] = useState("")
  const [image, setImage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const formData = new FormData()
      formData.append("content", content)
      if(image) formData.append("image", image)

      await axios.post("http://localhost:5000/api/posts/post", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      alert("Post created!")
      navigate("/")
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create post")
    }
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded shadow max-w-lg mx-auto mt-6">
          <h2 className="text-xl font-bold mb-4">Create Post</h2>
          <form onSubmit={handleSubmit}>
            <textarea placeholder="What's on your mind?"
              value={content} onChange={(e) => setContent(e.target.value)}
              className="w-full border p-2 rounded mb-4 h-32" />
            <input type="file" accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mb-4" />
            <button type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost