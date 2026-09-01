import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WWE_CHAMPIONS } from '../data/wweData'
import Footer from '../COMPONENTS/Footer'
import SuperstarQuickModal from '../COMPONENTS/UI/SuperstarQuickModal'
import { FaTrophy, FaShieldAlt, FaBolt, FaCrown, FaArrowLeft, FaEye, FaCalendarAlt, FaFire, FaCheckCircle } from 'react-icons/fa'

export default function Champions() {
  const navigate = useNavigate()
  const [selectedChampionModal, setSelectedChampionModal] = useState(null)
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('All')

  const filteredChampions = WWE_CHAMPIONS.filter(champ => {
    if (selectedBrandFilter === 'All') return true
    return champ.brand === selectedBrandFilter
  })

  // All-time legendary championship reign milestones
  const HISTORIC_MILESTONES = [
    { title: "Longest Modern World Title Reign", holder: "Roman Reigns (Undisputed WWE Universal)", days: "1,316 Days", era: "Modern Renaissance" },
    { title: "Longest Intercontinental Title Reign", holder: "Gunther (Ring General)", days: "666 Days", era: "Modern Era" },
    { title: "Most World Championship Reigns", holder: "John Cena & Ric Flair (Tied)", days: "16x World Champions", era: "Historic Record" },
    { title: "Longest Women's World Title Reign", holder: "Rhea Ripley (Mami / Eradicator)", days: "380 Days", era: "Judgment Day Era" },
  ]

  return (
    <div className="min-h-screen bg-[#08090d] text-white pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-zinc-900/90 border border-zinc-800 hover:border-red-500 text-zinc-300 hover:text-white hover:bg-red-600/20 transition-all cursor-pointer shadow-lg hover:scale-105 flex items-center justify-center group"
            aria-label="Go Back"
            title="Go Back"
          >
            <FaArrowLeft className="text-sm group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <FaCrown className="text-amber-400" /> Current WWE Titleholders
          </div>
          <h1 className="text-5xl sm:text-6xl font-heading font-black tracking-wide uppercase">
            REIGN OF <span className="wwe-text-gradient-gold">CHAMPIONS</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            The summit of athletic greatness. Explore current titleholders across Raw and SmackDown, active reign counters, and championship pedigrees.
          </p>

          {/* Brand Filter */}
          <div className="flex justify-center gap-2 mt-8">
            {['All', 'Raw', 'SmackDown'].map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrandFilter(brand)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedBrandFilter === brand
                    ? 'bg-amber-500 text-black font-extrabold shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {brand} Champions
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Champions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChampions.map((champ) => (
            <div
              key={champ.id}
              onClick={() => setSelectedChampionModal(champ)}
              className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-900 via-[#10121a] to-[#0a0c12] border border-amber-500/40 hover:border-amber-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer flex flex-col justify-between"
            >
              {/* Champion Belt Header */}
              <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 px-5 py-2.5 flex items-center justify-between text-black font-black text-xs tracking-wider uppercase">
                <span className="flex items-center gap-1.5 font-heading text-sm">
                  <FaTrophy /> {champ.beltBadge}
                </span>
                <span className="bg-black/90 text-amber-300 px-2.5 py-0.5 rounded-md text-[11px] font-sans font-bold">
                  {champ.daysHeld} DAYS HELD
                </span>
              </div>

              {/* Champion Real Image */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-zinc-950">
                <img
                  src={champ.image}
                  alt={champ.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/superstars/cody-rhodes.jpg';
                  }}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-transparent to-transparent"></div>
                
                {/* Brand Pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 text-white font-extrabold text-[10px] uppercase border border-zinc-700">
                  {champ.brand}
                </div>

                <div className="absolute bottom-3 left-5 right-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{champ.nickname}</span>
                  <h3 className="text-3xl font-heading font-black text-white leading-none drop-shadow-md">
                    {champ.name}
                  </h3>
                  {champ.realName && (
                    <span className="text-[11px] text-zinc-400 font-medium block mt-0.5">
                      {champ.realName}
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-xl bg-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl flex items-center gap-2">
                    <FaEye /> Quick View Champion
                  </span>
                </div>
              </div>

              {/* Content & Details */}
              <div className="p-6 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <FaShieldAlt className="text-amber-400" /> {champ.title}
                </div>

                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {champ.bio}
                </p>

                <div className="bg-black/50 rounded-2xl p-3.5 border border-zinc-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-[11px] uppercase font-bold">Signature Finisher</span>
                    <span className="text-white font-bold truncate max-w-[170px]">{champ.finisher}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-[11px] uppercase font-bold">Hometown</span>
                    <span className="text-zinc-200 font-medium">{champ.hometown}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/card/${champ.id}`)
                  }}
                  className="w-full py-3 rounded-xl bg-zinc-800/80 hover:bg-amber-500 hover:text-black font-bold text-xs uppercase tracking-wider transition-all text-center block cursor-pointer"
                >
                  View Full Title Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Championship Milestones Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/70 border border-zinc-800 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
              Hall of Championship Legacy
            </span>
            <h3 className="text-3xl font-heading font-black text-white uppercase">
              RECORD-SETTING REIGNS IN HISTORY
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HISTORIC_MILESTONES.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-black/60 border border-zinc-800 space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-amber-400 block">{m.era}</span>
                <h4 className="font-heading font-bold text-lg text-white leading-tight">{m.title}</h4>
                <div className="text-2xl font-heading font-black text-amber-400">{m.days}</div>
                <p className="text-xs text-zinc-300 font-medium">{m.holder}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Modal */}
      {selectedChampionModal && (
        <SuperstarQuickModal
          superstar={selectedChampionModal}
          onClose={() => setSelectedChampionModal(null)}
        />
      )}

      <Footer />
    </div>
  )
}
