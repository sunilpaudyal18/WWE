import React from 'react'

export default function WweLogo({ className = "h-10 w-auto", showText = true }) {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Official WWE Scratch/Modern Vector Emblem */}
      <div className="relative group flex items-center justify-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/03/WWE_Logo.svg"
          alt="WWE Official Logo"
          className={`${className} object-contain filter drop-shadow-[0_2px_10px_rgba(225,6,0,0.4)] group-hover:scale-105 transition-transform duration-300`}
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-2xl sm:text-3xl font-heading font-black tracking-widest text-white leading-none group-hover:text-red-500 transition-colors">
            UNIVERSE
          </span>
          <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.3em] text-zinc-400 font-bold block uppercase mt-0.5">
            WORLD WRESTLING ENT.
          </span>
        </div>
      )}
    </div>
  )
}
