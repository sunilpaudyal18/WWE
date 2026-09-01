import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { WWE_SUPERSTARS } from '../data/wweData'
import Cards from '../COMPONENTS/UI/Cards'
import Footer from '../COMPONENTS/Footer'
import SuperstarQuickModal from '../COMPONENTS/UI/SuperstarQuickModal'
import { FaSearch, FaFilter, FaTrophy, FaFire, FaArrowLeft } from 'react-icons/fa'

export default function Superstars() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const initialBrandFilter = searchParams.get('filter') || 'All'
  const [selectedBrand, setSelectedBrand] = useState(initialBrandFilter)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSuperstarModal, setSelectedSuperstarModal] = useState(null)

  useEffect(() => {
    const brandParam = searchParams.get('filter')
    if (brandParam) {
      setSelectedBrand(brandParam)
    }
  }, [searchParams])

  // Filter superstars
  const filtered = WWE_SUPERSTARS.filter((star) => {
    const matchesSearch =
      star.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      star.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      star.finisher.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesBrand =
      selectedBrand === 'All' ||
      (selectedBrand === 'Champions' ? star.isChampion : star.brand === selectedBrand)

    const matchesCategory =
      selectedCategory === 'All' || star.category === selectedCategory

    return matchesSearch && matchesBrand && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#08090d] text-white pt-28 pb-12">
      {/* Header Banner with Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
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

        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <FaFire className="text-red-500" /> Official Roster & Legends
          </div>
          <h1 className="text-5xl sm:text-6xl font-heading font-black tracking-wide uppercase">
            WWE SUPERSTARS <span className="wwe-text-gradient-red">DIRECTORY</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            Explore authentic combat dossiers, in-ring finishers, career titles, and fighting statistics of every superstar across Raw, SmackDown, and NXT.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-10 p-4 sm:p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-4">
          {/* Search Input */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-base" />
            <input
              type="text"
              placeholder="Search superstar by name, nickname (e.g. American Nightmare, OTC, Mami), or finisher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 text-sm font-sans"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-800">
            {/* Brand Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-1 flex items-center gap-1">
                <FaFilter className="text-[10px]" /> Brand:
              </span>
              {['All', 'Champions', 'Raw', 'SmackDown', 'Legends'].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedBrand === brand
                      ? 'bg-red-600 text-white shadow-md scale-105'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-1">
                Division:
              </span>
              {['All', 'Men', 'Women'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-black shadow-md font-extrabold'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Roster Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Showing <span className="text-white font-bold">{filtered.length}</span> Superstars
          </span>
          {(searchTerm || selectedBrand !== 'All' || selectedCategory !== 'All') && (
            <button
              onClick={() => { setSearchTerm(''); setSelectedBrand('All'); setSelectedCategory('All'); }}
              className="text-xs font-bold text-red-400 hover:text-red-300 underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((superstar) => (
              <Cards
                key={superstar.id}
                superstar={superstar}
                onQuickView={(star) => setSelectedSuperstarModal(star)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/40 rounded-2xl border border-zinc-800 p-8">
            <h3 className="text-2xl font-heading font-bold text-white mb-2">No Superstars Found</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              We couldn't find any superstars matching your search or filters. Try adjusting your search query.
            </p>
          </div>
        )}
      </div>

      {/* Superstar Modal */}
      {selectedSuperstarModal && (
        <SuperstarQuickModal
          superstar={selectedSuperstarModal}
          onClose={() => setSelectedSuperstarModal(null)}
        />
      )}

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  )
}
