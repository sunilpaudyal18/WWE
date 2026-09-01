import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch, FaTimes, FaFire, FaTicketAlt, FaTrophy, FaCalendarAlt, FaNewspaper, FaBars, FaSyncAlt } from 'react-icons/fa'
import { WWE_SUPERSTARS, UPCOMING_EVENTS } from '../../data/wweData'
import WweLogo from '../UI/WweLogo'
import NewsArticleModal from '../UI/NewsArticleModal'
import { getLiveNews, syncLiveWweData, LIVE_TICKER_BULLETINS } from '../../services/wweLiveFeedService'

export default function Toolbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedBulletinNews, setSelectedBulletinNews] = useState(null)
  const [liveSyncTime, setLiveSyncTime] = useState("Live")
  const [isSyncing, setIsSyncing] = useState(false)

  // Auto-sync ticker & news feed every 30 seconds
  useEffect(() => {
    const runSync = async () => {
      setIsSyncing(true)
      const res = await syncLiveWweData()
      setLiveSyncTime(res.lastSync)
      setTimeout(() => setIsSyncing(false), 800)
    }

    runSync()
    const interval = setInterval(runSync, 30000)
    return () => clearInterval(interval)
  }, [])

  // Scroll listener for translucent blur header transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setShowSearch(false)
  }, [location.pathname])

  const nav_items = [
    { id: "home", title: "Home", path: '/' },
    { id: "superstars", title: "Superstars", path: '/superstars' },
    { id: "champions", title: "Champions", path: '/champions' },
    { id: "shows", title: "Shows & PLEs", path: '/event' },
    { id: "news", title: "News & Stories", path: '/blog' },
    { id: "contracts", title: "Contracts & Tryouts", path: '/contact' },
    { id: "about", title: "About WWE", path: '/about' },
  ]

  // Filter superstars & events for instant search modal
  const filteredSuperstars = searchQuery.trim() === "" ? [] : WWE_SUPERSTARS.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.brand.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 4)

  const filteredEvents = searchQuery.trim() === "" ? [] : UPCOMING_EVENTS.filter(e =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 2)

  // Handle clicking a bulletin ticker item
  const handleBulletinClick = (text) => {
    const newsList = getLiveNews()
    const found = newsList.find(n => text.toLowerCase().includes(n.category.toLowerCase()) || text.toLowerCase().includes(n.title.slice(0, 15).toLowerCase())) || newsList[0]
    setSelectedBulletinNews(found)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Breaking News Ticker with Real-Time Auto-Update */}
      <div className="bg-gradient-to-r from-red-900 via-red-600 to-black text-xs font-semibold uppercase tracking-wider text-white py-1.5 px-4 overflow-hidden border-b border-red-500/30">
        <div className="flex items-center max-w-7xl mx-auto justify-between">
          <div className="flex items-center gap-1.5 bg-black/70 px-2.5 py-0.5 rounded text-amber-400 font-bold shrink-0 mr-4 cursor-pointer hover:bg-black transition-colors"
            onClick={() => handleBulletinClick("Breaking")}
          >
            <FaFire className="animate-pulse text-red-500" /> LIVE BULLETIN
          </div>

          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee inline-block text-zinc-200">
              {LIVE_TICKER_BULLETINS.map((b, i) => (
                <span
                  key={i}
                  onClick={() => handleBulletinClick(b)}
                  className="mx-6 hover:text-amber-300 cursor-pointer transition-colors"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[10px] text-zinc-300 bg-black/60 px-2.5 py-0.5 rounded shrink-0 ml-4 font-mono font-bold">
            <FaSyncAlt className={`text-red-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>AUTO-SYNCED: {liveSyncTime}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${
        scrolled 
          ? 'bg-[#08090d]/95 backdrop-blur-xl border-b border-zinc-800 shadow-2xl py-3' 
          : 'bg-gradient-to-b from-[#08090d]/90 via-[#08090d]/60 to-transparent py-4'
      }`}>
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          {/* WWE Official Logo / Branding */}
          <div 
            onClick={() => navigate('/')}
            className="cursor-pointer group select-none"
          >
            <WweLogo className="h-9 sm:h-10 w-auto" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {nav_items.map((item, i) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={i}
                  to={item.path}
                  className={`px-3.5 py-1.5 rounded-lg text-xs xl:text-sm font-semibold tracking-wide transition-all duration-200 relative cursor-pointer ${
                    isActive
                      ? 'text-white bg-red-600/20 border border-red-500/50 shadow-sm shadow-red-500/20'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.title}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-red-500 rounded-full shadow-glow"></span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Action Icons & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Live Indicator Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>LIVE PLE HUB</span>
            </div>

            {/* Instant Search Trigger */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-red-500/60 hover:bg-red-500/10 transition-all cursor-pointer"
              title="Search WWE Universe"
              aria-label="Search"
            >
              <FaSearch className="text-base" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 px-4 pt-2 pb-6 bg-[#0c0e15] border-b border-zinc-800 space-y-2 animate-fadeIn">
            {nav_items.map((item, i) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={i}
                  to={item.path}
                  className={`block px-4 py-2.5 rounded-lg text-base font-semibold transition-all ${
                    isActive
                      ? 'text-white bg-red-600/20 border-l-4 border-red-500'
                      : 'text-zinc-200 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  {item.title}
                </Link>
              )
            })}
          </div>
        )}
      </nav>

      {/* Global Interactive Search Modal Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-2xl bg-[#11131b] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
              <FaSearch className="text-red-500 text-xl" />
              <input
                type="text"
                autoFocus
                placeholder="Search Superstars (Cody, Roman, Rhea...), Shows, or Events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-zinc-500 text-lg outline-none font-sans"
              />
              <button
                onClick={() => { setShowSearch(false); setSearchQuery(""); }}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            {/* Instant Search Results */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
              {searchQuery.trim() === "" ? (
                <div className="text-center py-8 text-zinc-400">
                  <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">Popular Searches</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Cody Rhodes", "Roman Reigns", "Rhea Ripley", "WrestleMania 42", "SmackDown", "Gunther"].map((tag, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1.5 bg-zinc-800/80 hover:bg-red-600 hover:text-white rounded-full text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {filteredSuperstars.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 px-2">Superstars</h4>
                      <div className="space-y-1.5">
                        {filteredSuperstars.map(s => (
                          <div
                            key={s.id}
                            onClick={() => {
                              navigate(`/card/${s.id}`)
                              setShowSearch(false)
                            }}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-800/80 cursor-pointer transition-colors group"
                          >
                            <img
                              src={s.image}
                              alt={s.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/superstars/cody-rhodes.jpg';
                              }}
                              className="w-12 h-12 rounded-lg object-cover border border-zinc-700"
                            />
                            <div>
                              <div className="font-bold text-white group-hover:text-red-400 transition-colors">{s.name}</div>
                              <div className="text-xs text-zinc-400">{s.nickname} • <span className="text-red-400">{s.brand}</span></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredEvents.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 px-2">Upcoming Events</h4>
                      <div className="space-y-1.5">
                        {filteredEvents.map(ev => (
                          <div
                            key={ev.id}
                            onClick={() => {
                              navigate('/event')
                              setShowSearch(false)
                            }}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/80 cursor-pointer transition-colors"
                          >
                            <div>
                              <div className="font-bold text-white">{ev.title}</div>
                              <div className="text-xs text-zinc-400">{ev.date} • {ev.venue}, {ev.location}</div>
                            </div>
                            <span className="px-2.5 py-1 bg-red-600 text-white rounded text-xs font-bold">Details</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredSuperstars.length === 0 && filteredEvents.length === 0 && (
                    <div className="text-center py-8 text-zinc-500">
                      No results found for "{searchQuery}". Try searching for another superstar or event.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ticker Bulletin Reader Modal */}
      {selectedBulletinNews && (
        <NewsArticleModal
          article={selectedBulletinNews}
          onClose={() => setSelectedBulletinNews(null)}
        />
      )}
    </header>
  )
}
