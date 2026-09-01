import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrophy, FaBolt, FaArrowRight, FaShieldAlt, FaEye } from 'react-icons/fa'
import SuperstarQuickModal from './SuperstarQuickModal'

export default function Cards({ superstar, featured = false, onQuickView = null }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  if (!superstar) return null

  const brandColors = {
    Raw: 'bg-red-600/90 text-white border-red-500/50',
    SmackDown: 'bg-blue-600/90 text-white border-blue-500/50',
    NXT: 'bg-amber-500/90 text-black border-amber-400/50',
    Legends: 'bg-purple-600/90 text-white border-purple-500/50',
  }

  const brandBadge = brandColors[superstar.brand] || 'bg-zinc-800 text-white border-zinc-700'

  const handleCardClick = () => {
    if (onQuickView) {
      onQuickView(superstar)
    } else {
      setShowModal(true)
    }
  }

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#161922] to-[#0c0e14] border border-zinc-800 hover:border-red-500/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/20 cursor-pointer flex flex-col justify-between ${
          featured ? 'ring-2 ring-amber-500/50' : ''
        }`}
      >
        {/* Top Media Container */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-zinc-950">
          <img
            src={superstar.image}
            alt={superstar.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/superstars/cody-rhodes.jpg';
            }}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-black/30"></div>

          {/* Brand Tag */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider border shadow-md ${brandBadge}`}>
              {superstar.brand}
            </span>
            {superstar.isChampion && (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/90 text-black border border-amber-300/60 shadow-md flex items-center gap-1">
                <FaTrophy className="text-xs" /> CHAMPION
              </span>
            )}
          </div>

          {/* Floating Overall Rating / Stat Badge */}
          {superstar.stats && (
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-zinc-700 text-right">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block leading-none">OVR</span>
              <span className="text-sm font-heading font-black text-amber-400">
                {Math.round((superstar.stats.power + superstar.stats.speed + superstar.stats.charisma + superstar.stats.technical) / 4)}
              </span>
            </div>
          )}

          {/* Quick View Hover Pill */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
            <span className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <FaEye /> Quick View Profile
            </span>
          </div>
        </div>

        {/* Card Content Information */}
        <div className="p-5 flex-1 flex flex-col justify-between relative">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-1">
              {superstar.nickname || superstar.category}
            </div>
            <h3 className="text-2xl font-heading font-bold text-white tracking-wide group-hover:text-red-400 transition-colors">
              {superstar.name}
            </h3>
            {superstar.realName && (
              <div className="text-[11px] text-zinc-400 font-medium">
                {superstar.realName}
              </div>
            )}
            {superstar.title && (
              <p className="text-xs font-bold text-amber-300 mt-1 flex items-center gap-1.5">
                <FaShieldAlt className="text-amber-400" /> {superstar.title}
              </p>
            )}
            <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
              {superstar.bio}
            </p>
          </div>

          {/* Stats Preview Bars */}
          {superstar.stats && (
            <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-400 font-semibold">Finisher</span>
                <span className="text-zinc-200 font-bold truncate max-w-[150px]">{superstar.finisher}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-400 font-semibold">Power</span>
                <div className="w-24 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: `${superstar.stats.power}%` }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-4 pt-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1">
              Quick View
            </span>
            <div className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-red-600 flex items-center justify-center text-zinc-300 group-hover:text-white transition-all transform group-hover:translate-x-1">
              <FaArrowRight className="text-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Superstar Modal */}
      {showModal && (
        <SuperstarQuickModal
          superstar={superstar}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
