import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaFire, FaTicketAlt, FaPlay, FaTrophy, FaBolt } from 'react-icons/fa'

export default function Banner({ nextEvent }) {
  // Target date for next major PLE (WrestleMania 42)
  const targetDate = new Date('2026-04-18T19:00:00').getTime()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Graphic with Gradient Mesh & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('/events/wrestlemania.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/80 to-[#08090d]/60"></div>
        <div className="absolute inset-0 bg-radial from-red-600/20 via-transparent to-black/90"></div>
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Live Event Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-red-500/50 backdrop-blur-md mb-6 animate-pulse-slow shadow-lg shadow-red-900/30">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
          </span>
          <span className="text-xs uppercase tracking-widest font-extrabold text-white">
            THE ROAD TO WRESTLEMANIA 42 • LAS VEGAS
          </span>
        </div>

        {/* Explosive Hero Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white mb-4 leading-none drop-shadow-2xl">
          <span className="block text-zinc-100">THEN. NOW. FOREVER.</span>
          <span className="wwe-text-gradient-red block font-extrabold tracking-wider">
            TOGETHER.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          Witness unprecedented athletic dominance, storied championship rivalries, and record-breaking spectacles in the greatest sports entertainment universe on Earth.
        </p>

        {/* Live PLE Countdown Flip Clock */}
        <div className="mb-10 w-full max-w-xl">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 mb-3 text-center flex items-center justify-center gap-2">
            <FaBolt className="text-amber-400" /> Countdown to WrestleMania 42 Live Broadcast
          </div>
          <div className="grid grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col items-center p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
              <span className="text-2xl sm:text-4xl font-heading font-black text-white">{timeLeft.days}</span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">Days</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
              <span className="text-2xl sm:text-4xl font-heading font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">Hours</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
              <span className="text-2xl sm:text-4xl font-heading font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">Mins</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-red-950/40 border border-red-800/50">
              <span className="text-2xl sm:text-4xl font-heading font-black text-red-500 animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-red-400">Secs</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/superstars"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-base tracking-wider uppercase transition-all duration-300 shadow-xl shadow-red-600/30 hover:scale-105 flex items-center gap-2 group cursor-pointer"
          >
            <FaFire className="text-amber-300 group-hover:rotate-12 transition-transform" />
            Explore Superstars
          </Link>
          <Link
            to="/event"
            className="px-8 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/80 hover:border-zinc-500 font-bold text-base tracking-wider uppercase transition-all duration-300 backdrop-blur-md hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <FaTicketAlt className="text-red-400" />
            Shows & PLE Schedule
          </Link>
        </div>

        {/* Key Universe Stats Ribbon */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white">1.2 BILLION+</div>
            <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Universe Fans Global</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-red-500">180+</div>
            <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Broadcast Countries</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-amber-400">52 WEEKS</div>
            <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Non-Stop Live Action</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white">35+ TITLES</div>
            <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Championship Legacy</div>
          </div>
        </div>
      </div>
    </div>
  )
}