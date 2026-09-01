import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTimes, FaTrophy, FaBolt, FaMusic, FaShieldAlt, FaArrowRight, FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa'

export default function SuperstarQuickModal({ superstar, onClose }) {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!superstar) return null

  const handleGoToFullProfile = () => {
    onClose()
    navigate(`/card/${superstar.id}`)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="bg-[#0e1017] border border-zinc-700/80 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header */}
        <div className="sticky top-0 z-20 bg-[#0e1017]/95 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Go Back"
            title="Go Back"
          >
            <FaArrowLeft className="text-xs" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-red-600 text-zinc-300 hover:text-white transition-all cursor-pointer"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {/* Real Photo */}
            <div className="w-48 h-56 sm:w-52 sm:h-64 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0 shadow-2xl relative">
              <img
                src={superstar.image}
                alt={superstar.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/superstars/cody-rhodes.jpg';
                }}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-2 left-2 px-2.5 py-0.5 bg-red-600 font-extrabold text-[10px] uppercase rounded text-white">
                {superstar.brand}
              </div>
            </div>

            {/* Main Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                {superstar.nickname}
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-white uppercase leading-tight">
                {superstar.name}
              </h2>
              {superstar.realName && (
                <div className="text-xs text-zinc-400 font-medium">
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Real Name:</span> {superstar.realName}
                </div>
              )}
              {superstar.title && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase">
                  <FaShieldAlt /> {superstar.title}
                </div>
              )}
              <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                {superstar.bio}
              </p>
            </div>
          </div>

          {/* Stats Bar Preview */}
          {superstar.stats && (
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Combat Attributes</div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1 text-zinc-300">
                    <span>Power</span>
                    <span className="font-bold text-red-400">{superstar.stats.power}</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: `${superstar.stats.power}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1 text-zinc-300">
                    <span>Speed</span>
                    <span className="font-bold text-blue-400">{superstar.stats.speed}</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${superstar.stats.speed}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1 text-zinc-300">
                    <span>Charisma</span>
                    <span className="font-bold text-amber-400">{superstar.stats.charisma}</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${superstar.stats.charisma}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1 text-zinc-300">
                    <span>Ring Tech</span>
                    <span className="font-bold text-purple-400">{superstar.stats.technical}</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: `${superstar.stats.technical}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Arsenal & Measurements */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <span className="text-[10px] uppercase font-bold text-zinc-500 block">Finisher</span>
              <span className="font-bold text-white truncate block">{superstar.finisher}</span>
            </div>
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <span className="text-[10px] uppercase font-bold text-zinc-500 block">Height / Weight</span>
              <span className="font-bold text-zinc-200">{superstar.height} • {superstar.weight}</span>
            </div>
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-bold text-zinc-500 block">Theme Song</span>
              <span className="font-bold text-amber-300 truncate block flex items-center gap-1">
                <FaMusic className="text-[10px]" /> {superstar.theme || "WWE In-Ring Anthem"}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <button
              onClick={handleGoToFullProfile}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              Open Full Superstar Dossier <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
