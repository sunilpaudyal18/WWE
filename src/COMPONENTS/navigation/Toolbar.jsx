import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa"

export default function Toolbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState("")

  const nav_items = [
    { title: "Home", path: '/' },
    { title: "About", path: '/about' },
    { title: "Contact", path: '/contact' },
    { title: "Blog", path: '/blog' },
    { title: "Event", path: '/event' },
  ]

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 shadow-2xl bg-gray-900/90">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">

          <div
            className="text-2xl font-extrabold tracking-wider text-white drop-shadow-lg cursor-pointer hover:text-red-400"
            onClick={() => navigate('/')}
          >
            WWE
          </div>

         
          <div className="flex space-x-6">
            {nav_items.map((item, i) => {
              const isActive = location.pathname === item.path
              return (
                <div key={i} className="relative group">
                  <Link
                    to={item.path}
                    className={`capitalize font-semibold text-lg transition-colors duration-300
                    ${isActive ? 'text-red-500' : 'text-white hover:text-red-400'}`}
                  >
                    {item.title}
                  </Link>
                  <span
                    className={`absolute left-0 -bottom-1 h-1 bg-red-500 transition-all duration-500 ease-in-out
                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  ></span>
                </div>
              )
            })}
          </div>

          
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-white hover:text-red-400 text-xl ml-4 transition-all"
          >
            <FaSearch />
          </button>
        </div>
      </nav>

      {showSearch && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full max-w-xl px-6 z-40">
          <input type="text" placeholder="Search for superstars, news, shows or videos" value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-red-500 shadow-lg outline-none"
          />
        </div>
      )}
    </div>
  )
}
