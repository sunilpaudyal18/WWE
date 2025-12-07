import React, { useState } from 'react'
import blogbg from '../assets/blog-all.jpg'


function Blog() {
  const [blogData, setBlogData] = useState({
    title: '',
    author: '',
    content: '',
  })

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!blogData.title || !blogData.author || !blogData.content) {
      alert('Please fill all fields!')
      return
    }

    console.log('Blog submitted:', blogData)
    alert(`Blog "${blogData.title}" by ${blogData.author} submitted successfully!`)

    // Reset form
    setBlogData({
      title: '',
      author: '',
      content: '',
    })
  }

  return (
    <div 
    style={{
            backgroundImage: `url(${blogbg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
          }}
          className="flex items-center"
        >

    <div className="max-w-2xl p-8 mx-auto mt-12 text-white bg-gray-900 border border-blue-500 shadow-2xl rounded-2xl">
      <h1 className="mb-6 text-3xl font-bold text-center text-blue-500">
        Create a New Blog Post
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={blogData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="author"
          value={blogData.author}
          onChange={handleChange}
          placeholder="Author Name"
          className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="content"
          value={blogData.content}
          onChange={handleChange}
          placeholder="Write your blog content here..."
          rows="6"
          className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <button className="w-full py-3 font-bold transition bg-blue-600 rounded-xl hover:bg-blue-700">
          Submit Blog
        </button>
      </form>

      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold text-blue-400">Blog Preview:</h2>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="mb-1 text-lg font-bold">{blogData.title || 'Blog Title'}</h3>
          <p className="mb-2 text-sm text-gray-400">{blogData.author || 'Author Name'}</p>
          <p>{blogData.content || 'Blog content will appear here...'}</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Blog
