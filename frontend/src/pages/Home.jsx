import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts/")
        setPosts(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }, [])

  const handleLike = async (postId) => 
    {
      try {
       const token = localStorage.getItem("token")
       await axios.post(`http://localhost:5000/api/posts/post/${postId}/likeAndUnlike`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
       
       const res = await axios.get("http://localhost:5000/api/posts/")
       setPosts(res.data.data)
        } catch (error) {
      console.log(error)
      }
    }
  
  return (
    <div><Navbar />
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Home Feed</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet</p>
      ) : (
        posts.map(post => (
        <div key={post._id} className="bg-white p-4 rounded shadow mb-4 max-w-lg mx-auto">
            <p className="font-bold">{post.author?.userName}</p>
            <p className="mt-2">{post.content}</p>
            <button onClick={() => handleLike(post._id)}
             className="mt-2 text-blue-500 font-semibold">
            ❤️ {post.likes.length} Likes
             </button>
        </div>
        ))
      )}
      
    </div>
    </div>

  )
}


export default Home