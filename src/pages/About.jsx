import React, { useState } from 'react'
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa'
import wweBg from '../assets/wwe-shield.jpg'

function About() {
  const [username, setUsername] = useState('')

  const handleSubmit = () => {
    if (username.trim().length === 0) {
      alert('Please enter your name!')
    } else {
      alert(`Hello, ${username}! Welcome to the WWE Universe! 💪`)
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${wweBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
      className="flex items-center"
    >
      <div className="max-w-2xl p-8 mx-auto mt-12 text-white bg-black bg-opacity-80 border-red-500 shadow-2xl rounded-2xl">
        <h1 className="mb-6 text-4xl font-extrabold text-center text-red-500 drop-shadow-lg">
          About WWE
        </h1>

        <p className="mb-6 text-lg text-center text-gray-300">
          WWE (World Wrestling Entertainment) is a global entertainment company, famous for its wrestling superstars, shows, and events. Join us and be part of the action! 🔥💥
        </p>

        <div className="flex justify-center gap-6 mb-8 text-2xl">
          <a href="mailto:sunilpaudyal555@gmail.com" target="_blank" rel="noopener noreferrer">
            <FaEnvelope className="text-red-500 transition hover:text-red-700" />
          </a>
          <a href="https://facebook.com" target="_blank" className="hover:text-blue-500">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" className="hover:text-pink-500">
            <FaInstagram />
          </a>
        </div>

        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-3 font-bold transition bg-red-600 rounded-xl hover:bg-red-700"
          >
            Say Hello 💥
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
