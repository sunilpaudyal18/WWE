import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { WWE_SUPERSTARS, WWE_CHAMPIONS } from '../data/wweData'
import Cards from '../COMPONENTS/UI/Cards'
import Footer from '../COMPONENTS/Footer'
import { FaTrophy, FaBolt, FaArrowLeft, FaShieldAlt, FaFire, FaMusic, FaCheckCircle, FaStar, FaShareAlt } from 'react-icons/fa'

export default function CardDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  // Find superstar by id or name
  const superstar =
    WWE_SUPERSTARS.find(s => s.id === id || s.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === id) ||
    WWE_CHAMPIONS.find(s => s.id === id) ||
    WWE_SUPERSTARS[0]

  const relatedSuperstars = WWE_SUPERSTARS.filter(s => s.id !== superstar.id && (s.brand === superstar.brand || s.category === superstar.category)).slice(0, 4)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#08090d] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-zinc-900/90 border border-zinc-800 hover:border-red-500 text-zinc-300 hover:text-white hover:bg-red-600/20 transition-all cursor-pointer shadow-lg hover:scale-105 flex items-center justify-center group"
            aria-label="Go Back"
            title="Go Back"
          >
            <FaArrowLeft className="text-sm group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white cursor-pointer transition-colors"
          >
            <FaShareAlt /> {copied ? "Link Copied!" : "Share Profile"}
          </button>
        </div>

        {/* Hero Dossier Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#141724] to-[#0a0c12] border border-zinc-800 shadow-2xl overflow-hidden mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            {/* Left: Superstar Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-96 sm:h-[480px] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
                <img
                  src={superstar.image}
                  alt={superstar.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/superstars/cody-rhodes.jpg';
                  }}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-red-600 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md">
                    {superstar.brand}
                  </span>
                  {superstar.isChampion && (
                    <span className="px-3 py-1 bg-amber-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md flex items-center gap-1">
                      <FaTrophy /> Champion
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-0.5">
                    {superstar.nickname}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-heading font-black text-white leading-none">
                    {superstar.name}
                  </h1>
                </div>
              </div>
            </div>

            {/* Right: Detailed Dossier & Stats */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs font-bold uppercase">
                    Official Superstar Profile
                  </span>
                  {superstar.title && (
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase flex items-center gap-1">
                      <FaShieldAlt /> {superstar.title}
                    </span>
                  )}
                </div>
                <h2 className="text-4xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
                  {superstar.name}
                </h2>
                {superstar.realName && (
                  <div className="text-xs font-semibold text-zinc-400 tracking-wide mt-1">
                    <span className="text-zinc-500 uppercase font-bold text-[10px] mr-1.5">Real Name:</span>
                    <span className="text-zinc-200">{superstar.realName}</span>
                  </div>
                )}
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mt-3">
                  {superstar.bio}
                </p>
              </div>

              {/* Physical & Career Attributes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-500 font-bold uppercase text-[10px] block">Height</span>
                  <span className="text-white font-bold text-sm">{superstar.height || "6 ft 2 in"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-bold uppercase text-[10px] block">Weight</span>
                  <span className="text-white font-bold text-sm">{superstar.weight || "225 lbs"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-bold uppercase text-[10px] block">Hometown</span>
                  <span className="text-white font-bold text-sm">{superstar.hometown || "USA"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-bold uppercase text-[10px] block">Brand</span>
                  <span className="text-red-400 font-bold text-sm">{superstar.brand}</span>
                </div>
              </div>

              {/* Signature Arsenal */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">Signature Arsenal</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-red-600/20 border border-red-500/40 text-red-300 font-bold text-xs flex items-center gap-1.5">
                    <FaBolt className="text-red-400" /> Finisher: {superstar.finisher}
                  </div>
                  {superstar.signature && (
                    <div className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 font-semibold text-xs">
                      Signatures: {superstar.signature}
                    </div>
                  )}
                  {superstar.theme && (
                    <div className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 font-semibold text-xs flex items-center gap-1.5">
                      <FaMusic className="text-amber-400" /> Theme: {superstar.theme}
                    </div>
                  )}
                </div>
              </div>

              {/* Attributes & In-Ring Rating Breakdown */}
              {superstar.stats && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">Combat Attributes</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-zinc-400">Power & Impact</span>
                        <span className="text-white">{superstar.stats.power}/100</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: `${superstar.stats.power}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-zinc-400">Speed & Agility</span>
                        <span className="text-white">{superstar.stats.speed}/100</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${superstar.stats.speed}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-zinc-400">Crowd Charisma</span>
                        <span className="text-white">{superstar.stats.charisma}/100</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: `${superstar.stats.charisma}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-zinc-400">Ring Psychology</span>
                        <span className="text-white">{superstar.stats.technical}/100</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: `${superstar.stats.technical}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Career Accolades */}
              {superstar.careerTitles && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                  <span className="text-amber-400 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                    <FaTrophy /> Career Championship Honors
                  </span>
                  <p className="text-zinc-200 font-medium">{superstar.careerTitles}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Roster Superstars */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-heading font-black uppercase text-white">
              MORE <span className="text-red-500">{superstar.brand}</span> SUPERSTARS
            </h3>
            <Link to="/superstars" className="text-xs font-bold text-red-400 hover:text-red-300 uppercase">
              View All Superstars →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedSuperstars.map((star) => (
              <Cards key={star.id} superstar={star} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  )
}
