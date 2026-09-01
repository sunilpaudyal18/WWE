import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaTiktok, FaPaperPlane, FaShieldAlt, FaTv, FaTicketAlt } from 'react-icons/fa'
import WweLogo from './UI/WweLogo'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim() && email.includes('@')) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  return (
    <footer className="bg-[#050608] border-t border-zinc-800/80 text-zinc-400 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>

      {/* Newsletter VIP Club Banner */}
      <div className="border-b border-zinc-800/60 bg-gradient-to-b from-zinc-950/60 to-[#050608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
                <FaShieldAlt /> WWE Universe VIP Access
              </div>
              <h3 className="text-3xl sm:text-4xl font-heading font-black text-white uppercase tracking-wide">
                GET FIRST ACCESS TO TICKETS, EXCLUSIVE MERCH & BREAKING NEWS
              </h3>
              <p className="text-sm text-zinc-400 mt-2">
                Join over 25 Million WWE newsletter members. Unsubscribe at any time.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-600/50 text-red-300 font-bold text-center animate-fadeIn">
                  🎉 Welcome to the WWE Universe VIP Club! Check your inbox for your exclusive perks.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 text-sm font-sans"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <FaPaperPlane className="text-xs" /> Join Now
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand & Identity */}
          <div className="col-span-2 md:col-span-2">
            <div className="mb-4">
              <WweLogo className="h-10 w-auto" />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6 max-w-sm">
              World Wrestling Entertainment (WWE), a TKO Group Holdings company, is the undisputed global leader in sports entertainment, reaching over 1 billion households worldwide.
            </p>

            <div className="flex items-center gap-3">
              <a href="https://www.youtube.com/user/WWEFanNation" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors text-zinc-300">
                <FaYoutube />
              </a>
              <a href="https://www.instagram.com/wwe/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors text-zinc-300">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/WWE" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors text-zinc-300">
                <FaFacebook />
              </a>
              <a href="https://twitter.com/WWE" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-cyan-500 hover:text-white flex items-center justify-center transition-colors text-zinc-300">
                <FaTwitter />
              </a>
              <a href="https://www.tiktok.com/@wwe" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-colors text-zinc-300">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Col 2: Flagship Brands */}
          <div>
            <h4 className="text-sm font-heading font-black text-white uppercase tracking-wider mb-4 border-b border-zinc-800 pb-1">
              SHOWS & BRANDS
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/event" className="hover:text-red-400 transition-colors">Monday Night Raw</Link></li>
              <li><Link to="/event" className="hover:text-blue-400 transition-colors">Friday Night SmackDown</Link></li>
              <li><Link to="/event" className="hover:text-amber-400 transition-colors">WWE NXT</Link></li>
              <li><Link to="/event" className="hover:text-white transition-colors">WrestleMania 42</Link></li>
              <li><Link to="/event" className="hover:text-white transition-colors">Royal Rumble</Link></li>
              <li><Link to="/event" className="hover:text-white transition-colors">SummerSlam</Link></li>
            </ul>
          </div>

          {/* Col 3: WWE Universe */}
          <div>
            <h4 className="text-sm font-heading font-black text-white uppercase tracking-wider mb-4 border-b border-zinc-800 pb-1">
              UNIVERSE HUB
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/superstars" className="hover:text-white transition-colors">Superstars Directory</Link></li>
              <li><Link to="/#champions" className="hover:text-amber-400 transition-colors">Championship Belts</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">News & Match Recaps</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition-colors">Performance Center Tryouts</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Attitude & Modern Eras</Link></li>
              <li><a href="https://shop.wwe.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Official WWE Shop</a></li>
            </ul>
          </div>

          {/* Col 4: Corporate & Legal */}
          <div>
            <h4 className="text-sm font-heading font-black text-white uppercase tracking-wider mb-4 border-b border-zinc-800 pb-1">
              CORPORATE
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="https://corporate.wwe.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TKO Group Holdings</a></li>
              <li><a href="https://community.wwe.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WWE Community & Charity</a></li>
              <li><a href="https://corporate.wwe.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Careers & Internships</a></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Media Credentials</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} World Wrestling Entertainment, Inc. All Rights Reserved. A TKO Company.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">Cookie Preferences</span>
            <span className="hover:text-zinc-300 cursor-pointer">Your Privacy Choices</span>
            <span className="hover:text-zinc-300 cursor-pointer">Security & Protection</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
