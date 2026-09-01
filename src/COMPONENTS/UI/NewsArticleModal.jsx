import React, { useState, useEffect } from 'react'
import { FaTimes, FaFire, FaThumbsUp, FaShareAlt, FaCalendarAlt, FaUser, FaClock, FaCheckCircle, FaArrowLeft } from 'react-icons/fa'

export default function NewsArticleModal({ article, onClose }) {
  const [cheers, setCheers] = useState(128)
  const [hasCheered, setHasCheered] = useState(false)
  const [copied, setCopied] = useState(false)

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!article) return null

  const handleCheer = () => {
    if (!hasCheered) {
      setCheers(c => c + 1)
      setHasCheered(true)
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '/blog')
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="bg-[#0f111a] border border-zinc-700/80 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Back & Close */}
        <div className="sticky top-0 z-20 bg-[#0f111a]/95 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
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

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Category Badge & Live Pulse */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md flex items-center gap-1.5">
              <FaFire /> {article.category || "WWE Breaking"}
            </span>
            <span className="px-3 py-1 bg-zinc-800 text-amber-400 font-bold text-xs uppercase rounded-lg border border-zinc-700">
              🔴 Live Verified News
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight leading-snug">
            {article.title}
          </h2>

          {/* Author Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 border-y border-zinc-800 py-3">
            <span className="flex items-center gap-1.5 text-zinc-300 font-semibold">
              <FaUser className="text-red-500" /> {article.author || "WWE Official Correspondent"}
            </span>
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-zinc-500" /> {article.date || "Just Now"}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock className="text-zinc-500" /> {article.readTime || "3 min read"}
            </span>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-xl">
            <img
              src={article.image}
              alt={article.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/superstars/cody-rhodes.jpg';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-transparent to-transparent"></div>
          </div>

          {/* Summary Callout Box */}
          {article.summary && (
            <div className="p-4 rounded-xl bg-red-950/20 border-l-4 border-red-500 text-zinc-200 text-sm italic font-medium leading-relaxed">
              "{article.summary}"
            </div>
          )}

          {/* Full Article Narrative */}
          <div className="text-sm sm:text-base text-zinc-300 leading-relaxed space-y-4 font-normal">
            <p>{article.content || article.summary}</p>
            <p>
              WWE continues to provide unprecedented access to breaking developments as the road to WrestleMania and weekly live flagship broadcasts captivate audiences across 180 countries. Stay tuned for live post-match reactions and backstage exclusive interviews.
            </p>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase text-zinc-500">Related:</span>
              {article.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-zinc-800/80 rounded-lg text-xs font-semibold text-zinc-300 border border-zinc-700">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Interaction Bar */}
          <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleCheer}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                hasCheered 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                  : 'bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700'
              }`}
            >
              <FaThumbsUp /> {hasCheered ? `Cheered! (${cheers})` : `Cheer Story (${cheers})`}
            </button>

            <button
              onClick={handleShare}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <FaShareAlt /> {copied ? "Article Link Copied!" : "Share Editorial"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
