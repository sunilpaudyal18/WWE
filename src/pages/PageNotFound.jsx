import React from 'react'
import { Link } from 'react-router-dom'
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa'
import Footer from '../COMPONENTS/Footer'

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-[#08090d] text-white pt-32 pb-16 flex flex-col justify-between">
      <div className="max-w-2xl mx-auto px-4 text-center my-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
          <FaExclamationTriangle /> Official Referee Countout
        </div>

        <h1 className="text-8xl sm:text-9xl font-heading font-black text-red-600 leading-none drop-shadow-2xl">
          404
        </h1>

        <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white mt-2 mb-4">
          YOU'VE BEEN COUNTED OUT OF THE RING!
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          The referee has reached the count of 10. The page you are looking for has been disqualified or moved to another arena.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-red-600/30 transition-all hover:scale-105"
        >
          <FaArrowLeft /> Return to WWE Universe Home
        </Link>
      </div>

      <Footer />
    </div>
  )
}
