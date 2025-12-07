import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Toolbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const nav_items = [
    { title: "Home", path: '/' },
    { title: "About", path: '/about' },
    { title: "Contact", path: '/contact' },
    { title: "Blog", path: '/blog' },
    { title: "Event", path: '/event' },
  ]

  return (
    <nav className="fixed top-0 -left-5 sm:left-0 right-0 z-50 shadow-2xl">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
    
        <div className="text-2xl font-extrabold tracking-wider rop-shadow-lg" onClick={()=>{navigate('/')}}>
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
      </div>
    </nav>
  )
}
