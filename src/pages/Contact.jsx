import React from 'react'
import { FaEnvelope } from 'react-icons/fa'
import wweco from '../assets/wwecon.jpg'

function Contact() {
  return (
    <div
    style={{
            backgroundImage: `url(${wweco})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
          }}
          className="flex items-center"
        >
    <div className="max-w-2xl p-8 mx-auto mt-12 text-white border border-red-500 shadow-2xl rounded-2xl">
      <h1 className="mb-6 text-4xl font-extrabold tracking-wide text-center text-red-500 drop-shadow-lg">
        WWE Contact Page
      </h1>

      <p className="mb-8 text-lg text-center text-gray-300">
        Want to join the WWE Universe? Contact us now! 💪🔥
      </p>

      <div className="p-5 space-y-3 border border-gray-700 shadow-md bg-gray-900/60 rounded-xl">
        <p className="text-lg">
          <a href="mailto:sunilpaudyal555@gmail.com" target="_blank" rel="noopener noreferrer">
            <FaEnvelope className="text-2xl text-red-500 transition duration-300 hover:text-red-700" />
          </a>
        </p>
        <p>
          <a href="tel:+9779867420439" className="text-blue-600 hover:underline">
            +977-9867420439 📞
          </a>
        </p>
        <p>
          <a href="https://facebook.com" target="_blank" className="hover:text-blue-500">
            🌐 Facebook
          </a>
        </p>
        <p>
          <a href="https://instagram.com" target="_blank" className="hover:text-pink-500">
            📸 Instagram
          </a>
        </p>
      </div>

      <h2 className="mt-8 mb-4 text-2xl font-semibold text-center text-red-400">
        Join the WWE Fight Club! 🥊
      </h2>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter Full Name"
          className="w-full p-3 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="email"
          placeholder="Enter Email Address"
          className="w-full p-3 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <textarea
          placeholder="Why do you want to join WWE?"
          rows="4"
          className="w-full p-3 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        ></textarea>

        <button className="w-full py-3 text-lg font-bold transition duration-300 bg-red-600 shadow-xl rounded-xl hover:bg-red-700">
          Submit Application 💥
        </button>
      </form>
    </div>
    </div>
  )
}

export default Contact
