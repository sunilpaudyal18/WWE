import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../COMPONENTS/Footer'
import { FaTrophy, FaGlobe, FaHeart, FaStar, FaShieldAlt, FaUsers, FaPlay, FaArrowLeft } from 'react-icons/fa'

export default function About() {
  const navigate = useNavigate()
  const ERAS = [
    {
      era: "The Golden Era (1980s)",
      stars: "Hulk Hogan, 'Macho Man' Randy Savage, André the Giant",
      description: "The birth of WrestleMania and sports entertainment as a worldwide pop-culture phenomenon, packing stadium arenas across the globe."
    },
    {
      era: "The Attitude Era (Late 1990s)",
      stars: "Stone Cold Steve Austin, The Rock, Undertaker, Triple H, DX, Mick Foley",
      description: "An edgy, rebellious cultural explosion with record television ratings, iconic catchphrases, and Monday Night Wars dominance."
    },
    {
      era: "Ruthless Aggression Era (2000s)",
      stars: "John Cena, Batista, Randy Orton, Brock Lesnar, Edge, Rey Mysterio",
      description: "Athletic technical evolution and the rise of future 16-time world champions who conquered Hollywood and sports entertainment."
    },
    {
      era: "The Renaissance Era (Present Day)",
      stars: "Cody Rhodes, Roman Reigns, Rhea Ripley, Gunther, Seth Rollins, CM Punk",
      description: "Record-shattering gate revenues, international stadium tours, TKO Group expansion, and global streaming integration on Netflix."
    }
  ]

  return (
    <div className="min-h-screen bg-[#08090d] text-white pt-28 pb-12">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
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

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <FaShieldAlt /> Heritage & Legacy
          </div>
          <h1 className="text-5xl sm:text-7xl font-heading font-black tracking-wide uppercase">
            THE STORY OF <span className="wwe-text-gradient-red">WORLD WRESTLING ENTERTAINMENT</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto mt-4 leading-relaxed font-light">
            For over seven decades, WWE has created mythological moments, iconic heroes, unforgettable villains, and electrifying spectacles that unite billions across every continent.
          </p>
        </div>
      </div>

      {/* Legacy Video / Graphic Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl h-80 sm:h-[420px]">
          <img
            src="/branding/blog-hero.jpg"
            alt="WWE Arena Atmosphere"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-black/40 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400 mb-2">WWE SIGNATURE MOTTO</span>
            <h2 className="text-4xl sm:text-6xl font-heading font-black text-white uppercase tracking-wider max-w-2xl drop-shadow-2xl">
              THEN. NOW. FOREVER. TOGETHER.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mt-3 font-medium">
              A promise to celebrate our storied history, innovate today's action, and build the future of sports entertainment.
            </p>
          </div>
        </div>
      </div>

      {/* Global Impact Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-heading font-black uppercase text-white">
            WWE BY THE <span className="text-red-500">NUMBERS</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl">
            <FaGlobe className="text-3xl text-red-500 mx-auto mb-3" />
            <div className="text-4xl font-heading font-black text-white">180+</div>
            <div className="text-xs font-bold uppercase text-zinc-400 mt-1">Countries Broadcasted</div>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl">
            <FaUsers className="text-3xl text-amber-400 mx-auto mb-3" />
            <div className="text-4xl font-heading font-black text-white">1.2B+</div>
            <div className="text-xs font-bold uppercase text-zinc-400 mt-1">Global Social Followers</div>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl">
            <FaTrophy className="text-3xl text-yellow-500 mx-auto mb-3" />
            <div className="text-4xl font-heading font-black text-white">41+</div>
            <div className="text-xs font-bold uppercase text-zinc-400 mt-1">Years of WrestleMania</div>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl">
            <FaHeart className="text-3xl text-rose-500 mx-auto mb-3" />
            <div className="text-4xl font-heading font-black text-white">6,000+</div>
            <div className="text-xs font-bold uppercase text-zinc-400 mt-1">Make-A-Wish Dreams Granted</div>
          </div>
        </div>
      </div>

      {/* Eras Timeline */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white">
            CHRONICLES OF THE <span className="wwe-text-gradient-gold">RING</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Discover the monumental eras that defined generations of wrestling fans.
          </p>
        </div>

        <div className="space-y-6">
          {ERAS.map((era, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl bg-[#0f1118] border border-zinc-800 hover:border-zinc-700 transition-all shadow-xl flex flex-col md:flex-row md:items-center gap-6"
            >
              <div className="md:w-1/3">
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider block mb-1">
                  ERA #{index + 1}
                </span>
                <h4 className="text-2xl font-heading font-black text-white">{era.era}</h4>
                <p className="text-xs text-red-400 font-bold mt-1">{era.stars}</p>
              </div>
              <div className="md:w-2/3 md:border-l md:border-zinc-800 md:pl-6">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{era.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community & Philanthropy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-black border border-red-900/50 p-8 sm:p-12">
          <div className="max-w-3xl">
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded-md">
              WWE Community Impact
            </span>
            <h3 className="text-3xl sm:text-4xl font-heading font-black text-white uppercase mt-4 mb-3">
              CHAMPIONS IN THE RING. CHAMPIONS FOR THE WORLD.
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              Through long-standing partnerships with Make-A-Wish, Special Olympics, Tribute to the Troops, and Connor's Cure, WWE superstars dedicate hundreds of hours each year bringing hope and smiles to brave children and military families worldwide.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-bold">
              <span className="bg-zinc-800 px-4 py-2 rounded-xl text-zinc-200">#MakeAWish</span>
              <span className="bg-zinc-800 px-4 py-2 rounded-xl text-zinc-200">#ConnorsCure</span>
              <span className="bg-zinc-800 px-4 py-2 rounded-xl text-zinc-200">#TributeToTheTroops</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
