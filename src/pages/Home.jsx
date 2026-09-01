import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Banner from '../COMPONENTS/UI/Banner'
import Cards from '../COMPONENTS/UI/Cards'
import Footer from '../COMPONENTS/Footer'
import NewsArticleModal from '../COMPONENTS/UI/NewsArticleModal'
import SuperstarQuickModal from '../COMPONENTS/UI/SuperstarQuickModal'
import { WWE_CHAMPIONS, WWE_SUPERSTARS, WWE_SHOWS, UPCOMING_EVENTS, WWE_SHOP_ITEMS } from '../data/wweData'
import { getLiveNews, syncLiveWweData } from '../services/wweLiveFeedService'
import { FaFire, FaTrophy, FaBolt, FaTicketAlt, FaPlay, FaChevronRight, FaTv, FaVoteYea, FaShoppingBag, FaArrowRight, FaCheckCircle, FaEye } from 'react-icons/fa'

export default function Home() {
  const navigate = useNavigate()
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('All')
  const [votedMatchIndex, setVotedMatchIndex] = useState({})
  const [selectedNews, setSelectedNews] = useState(null)
  const [selectedChampionModal, setSelectedChampionModal] = useState(null)
  const [cartAlert, setCartAlert] = useState(null)
  const [liveNewsList, setLiveNewsList] = useState(getLiveNews())

  // Auto-sync news
  useEffect(() => {
    const updateNews = async () => {
      const res = await syncLiveWweData()
      if (res && res.news) setLiveNewsList(res.news)
    }
    updateNews()
    const interval = setInterval(updateNews, 30000)
    return () => clearInterval(interval)
  }, [])

  // Filter superstars by category/brand
  const filteredSuperstars = WWE_SUPERSTARS.filter(s => {
    if (selectedBrandFilter === 'All') return true
    if (selectedBrandFilter === 'Champions') return s.isChampion
    if (selectedBrandFilter === 'Men' || selectedBrandFilter === 'Women' || selectedBrandFilter === 'Legends') {
      return s.category === selectedBrandFilter
    }
    return s.brand === selectedBrandFilter
  })

  // Handle fan match predictions
  const handleVote = (matchIndex, wrestlerKey) => {
    setVotedMatchIndex(prev => ({
      ...prev,
      [matchIndex]: wrestlerKey
    }))
  }

  // Handle simulated shop add to cart
  const handleAddToCart = (item) => {
    setCartAlert(`Added "${item.name}" to your WWE Universe Bag!`)
    setTimeout(() => setCartAlert(null), 3500)
  }

  return (
    <div className="min-h-screen bg-[#08090d] text-white">
      {/* 1. Hero Showcase with Live PLE Countdown */}
      <Banner />

      {/* Cart notification banner */}
      {cartAlert && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-red-400 animate-bounce">
          <FaCheckCircle className="text-xl text-amber-300" />
          <span className="font-bold text-sm">{cartAlert}</span>
        </div>
      )}

      {/* 2. Reign of Champions Showcase */}
      <section id="champions" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <FaTrophy className="text-amber-400" /> Title Holders
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-black tracking-wide text-white uppercase">
              REIGN OF <span className="wwe-text-gradient-gold">CHAMPIONS</span>
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-lg">
              The pinnacle of elite athletic gold. Click any champion to view their combat dossier and title defense history.
            </p>
          </div>
          <Link
            to="/superstars"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 group"
          >
            Explore All Title History <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Champions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WWE_CHAMPIONS.map((champ) => (
            <div
              key={champ.id}
              onClick={() => setSelectedChampionModal(champ)}
              className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900/90 to-[#0e1017] border border-amber-500/30 hover:border-amber-400/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer"
            >
              {/* Gold Champion Top Banner */}
              <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 px-4 py-2 flex items-center justify-between text-black font-extrabold text-xs tracking-wider uppercase">
                <span className="flex items-center gap-1.5 font-heading text-sm">
                  <FaTrophy /> {champ.beltBadge}
                </span>
                <span className="bg-black/80 text-amber-300 px-2 py-0.5 rounded text-[10px] font-sans font-bold">
                  {champ.daysHeld} DAYS HELD
                </span>
              </div>

              {/* Champion Image & Glow */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-950">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{champ.brand}</span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-black text-white leading-none drop-shadow-md">
                      {champ.name}
                    </h3>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-xl bg-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl flex items-center gap-2">
                    <FaEye /> Quick View Champion
                  </span>
                </div>
              </div>

              {/* Stats & Finisher */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {champ.bio}
                </p>
                <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Signature Finisher</span>
                    <span className="text-white font-bold">{champ.finisher}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Hometown</span>
                    <span className="text-zinc-300 font-medium">{champ.hometown}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Flagship Weekly Shows Hub */}
      <section className="py-16 bg-[#06070a] border-y border-zinc-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <FaTv /> Broadcast Schedule
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-black tracking-wide text-white uppercase">
              WEEKLY <span className="wwe-text-gradient-red">FLAGSHIP SHOWS</span>
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              Tune in every week for high-stakes championship clashes and unforgettable arena drama.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {WWE_SHOWS.map((show) => (
              <div
                key={show.id}
                className="group rounded-2xl overflow-hidden bg-gradient-to-b from-[#141620] to-[#0c0e14] border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={show.banner}
                    alt={show.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-black/40 to-transparent"></div>
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-xs font-bold font-sans text-amber-300 border border-zinc-700">
                    {show.network}
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-2xl font-heading font-black text-white">{show.name}</h3>
                    <p className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                      <FaBolt className="text-red-500" /> {show.airTime}
                    </p>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <p className="text-xs text-zinc-400 leading-relaxed italic">
                    "{show.tagline}"
                  </p>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">Featured Match Lineup</span>
                    {show.highlights.map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/event"
                    className="w-full py-2.5 rounded-xl bg-zinc-800/80 hover:bg-red-600 text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors text-center block mt-2"
                  >
                    View Show Details & Tickets
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Superstars Roster Spotlight & Filter Hub */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <FaFire /> Roster Directory
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-black tracking-wide text-white uppercase">
              WWE <span className="wwe-text-gradient-red">SUPERSTARS</span>
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Browse the most electrifying athletes and legends with real photos and career profiles.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Champions', 'Raw', 'SmackDown', 'Men', 'Women', 'Legends'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedBrandFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedBrandFilter === filter
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Superstars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSuperstars.slice(0, 8).map((superstar) => (
            <Cards key={superstar.id} superstar={superstar} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/superstars"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-sm uppercase tracking-wider transition-all hover:scale-105 shadow-xl"
          >
            View Full WWE Universe Roster (All Real Superstars) <FaArrowRight className="text-red-500" />
          </Link>
        </div>
      </section>

      {/* 5. Interactive Fan Match Predictor Ring */}
      <section className="py-16 bg-gradient-to-b from-[#0e1017] to-[#08090d] border-t border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <FaVoteYea /> Fan Zone
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-black tracking-wide text-white uppercase">
              WRESTLEMANIA 42 <span className="wwe-text-gradient-red">MATCH PREDICTIONS</span>
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              Cast your vote on upcoming marquee bouts and see real-time WWE Universe predictions!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING_EVENTS[0].matches.map((match, idx) => {
              const userVote = votedMatchIndex[idx]
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
                >
                  <div className="text-center mb-4">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 block mb-1">
                      {match.matchTitle}
                    </span>
                    <span className="text-xs text-zinc-400 italic block">{match.stipulation}</span>
                  </div>

                  {/* Bout Cards */}
                  <div className="space-y-4 my-4">
                    {/* Wrestler A */}
                    <div
                      onClick={() => handleVote(idx, 'A')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        userVote === 'A'
                          ? 'bg-red-600/20 border-red-500 ring-2 ring-red-500/50'
                          : 'bg-zinc-800/60 border-zinc-700/60 hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">{match.wrestlerA}</span>
                        <span className="font-heading font-bold text-lg text-red-400">{match.votesA}%</span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${match.votesA}%` }}></div>
                      </div>
                    </div>

                    <div className="text-center text-xs font-heading font-black text-zinc-400">VS</div>

                    {/* Wrestler B */}
                    <div
                      onClick={() => handleVote(idx, 'B')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        userVote === 'B'
                          ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/50'
                          : 'bg-zinc-800/60 border-zinc-700/60 hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">{match.wrestlerB}</span>
                        <span className="font-heading font-bold text-lg text-blue-400">{match.votesB}%</span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${match.votesB}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-2">
                    {userVote ? (
                      <span className="text-xs font-bold text-amber-400">✓ Your pick has been recorded!</span>
                    ) : (
                      <span className="text-xs text-zinc-400">Tap a superstar to vote</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. WWE Official Shop Highlights */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <FaShoppingBag /> Official Gear
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-black tracking-wide text-white uppercase">
              WWE SHOP <span className="wwe-text-gradient-gold">COLLECTIBLES</span>
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Authentic championship replica title belts, official superstar tees and premium memorabilia.
            </p>
          </div>
          <a
            href="https://shop.wwe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300"
          >
            Visit WWEShop.com <FaChevronRight className="text-xs" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WWE_SHOP_ITEMS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 flex flex-col justify-between hover:border-zinc-700 transition-all hover:shadow-xl group"
            >
              <div className="relative h-60 w-full overflow-hidden rounded-xl bg-zinc-950 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/superstars/cody-rhodes.jpg';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-amber-500 text-black">
                  {item.badge}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{item.category}</span>
                <h4 className="font-bold text-sm text-white line-clamp-2 leading-snug">{item.name}</h4>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-heading font-bold text-white">{item.price}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Latest Real-Time News & Exclusives */}
      <section className="py-16 bg-[#07080c] border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                <FaFire /> Live Media Desk
              </div>
              <h2 className="text-4xl sm:text-5xl font-heading font-black tracking-wide text-white uppercase">
                LATEST <span className="wwe-text-gradient-red">NEWS & EXCLUSIVES</span>
              </h2>
            </div>
            <Link
              to="/blog"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300"
            >
              Read All Stories <FaChevronRight className="text-xs" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveNewsList.slice(0, 6).map((news) => (
              <div
                key={news.id}
                onClick={() => setSelectedNews(news)}
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden hover:border-red-500/50 transition-all cursor-pointer group flex flex-col justify-between shadow-lg"
              >
                <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                  <img
                    src={news.image}
                    alt={news.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/superstars/cody-rhodes.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-red-600 text-white">
                    {news.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-zinc-400 block mb-1">{news.date} • {news.readTime}</span>
                    <h4 className="font-bold text-base text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                      {news.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-red-400 mt-4 flex items-center gap-1">
                    Read Full Story <FaArrowRight className="text-[10px]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Article Reader Modal */}
      {selectedNews && (
        <NewsArticleModal
          article={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}

      {/* Champion Quick View Modal */}
      {selectedChampionModal && (
        <SuperstarQuickModal
          superstar={selectedChampionModal}
          onClose={() => setSelectedChampionModal(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}
