import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../COMPONENTS/Footer'
import NewsArticleModal from '../COMPONENTS/UI/NewsArticleModal'
import { getLiveNews, syncLiveWweData } from '../services/wweLiveFeedService'
import { FaNewspaper, FaFire, FaPen, FaThumbsUp, FaComment, FaShareAlt, FaCheckCircle, FaSearch, FaArrowLeft, FaArrowRight, FaEye } from 'react-icons/fa'

export default function Blog() {
  const navigate = useNavigate()
  const [newsList, setNewsList] = useState(getLiveNews())
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [likes, setLikes] = useState({})
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)
  const [selectedArticleModal, setSelectedArticleModal] = useState(null)

  // Fan article authoring state
  const [fanArticle, setFanArticle] = useState({
    title: '',
    author: '',
    category: 'Fan Opinion',
    summary: '',
    content: ''
  })
  const [publishedSuccess, setPublishedSuccess] = useState(false)

  useEffect(() => {
    const updateNews = async () => {
      const res = await syncLiveWweData()
      if (res && res.news) setNewsList(res.news)
    }
    updateNews()
    const interval = setInterval(updateNews, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleLike = (e, id) => {
    e.stopPropagation()
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }))
  }

  const handlePublish = (e) => {
    e.preventDefault()
    if (fanArticle.title && fanArticle.author && fanArticle.content) {
      const newPost = {
        id: `fan-${Date.now()}`,
        title: fanArticle.title,
        category: fanArticle.category,
        date: 'Just Now (Live)',
        readTime: '2 min read',
        author: fanArticle.author,
        image: '/superstars/cody-rhodes.jpg',
        summary: fanArticle.summary || fanArticle.content.slice(0, 120) + '...',
        content: fanArticle.content,
        tags: ["WWE Fan", "Community", "Universe"]
      }

      setNewsList([newPost, ...newsList])
      setPublishedSuccess(true)
      setTimeout(() => {
        setPublishedSuccess(false)
        setShowSubmissionForm(false)
        setFanArticle({ title: '', author: '', category: 'Fan Opinion', summary: '', content: '' })
      }, 2500)
    }
  }

  // Filtered stories
  const filteredStories = newsList.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category.toLowerCase().includes(activeCategory.toLowerCase())
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.summary && item.summary.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#08090d] text-white pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Back Link */}
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

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <FaNewspaper /> Real-Time Live Feed & Editorial Desk
          </div>
          <h1 className="text-5xl sm:text-6xl font-heading font-black tracking-wide uppercase">
            WWE NEWS, RUMORS & <span className="wwe-text-gradient-red">EDITORIALS</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            The pulse of sports entertainment. Click on any story to read the full live article, verified dispatches, and passionate fan journalism.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowSubmissionForm(!showSubmissionForm)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center gap-2 cursor-pointer transition-all"
            >
              <FaPen /> {showSubmissionForm ? 'Close Editor' : 'Write a Fan Article'}
            </button>
          </div>
        </div>

        {/* Fan Story Submission Editor Drawer */}
        {showSubmissionForm && (
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-red-500/50 shadow-2xl animate-fadeIn">
            {publishedSuccess ? (
              <div className="text-center py-6">
                <FaCheckCircle className="text-4xl text-amber-400 mx-auto mb-2 animate-bounce" />
                <h3 className="text-2xl font-heading font-bold text-white">Story Published to Live Universe Feed!</h3>
                <p className="text-xs text-zinc-300">Your article is now live for all wrestling fans to read in real-time.</p>
              </div>
            ) : (
              <form onSubmit={handlePublish} className="space-y-4">
                <h3 className="text-2xl font-heading font-bold text-white uppercase flex items-center gap-2">
                  <FaFire className="text-red-500" /> Submit Your WWE Editorial
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Headline</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Why Gunther's Reign is the Best Modern Title Run"
                      value={fanArticle.title}
                      onChange={(e) => setFanArticle({ ...fanArticle, title: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Author Name / Handle</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Alex 'The Ring General' Miller"
                      value={fanArticle.author}
                      onChange={(e) => setFanArticle({ ...fanArticle, author: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Category</label>
                  <select
                    value={fanArticle.category}
                    onChange={(e) => setFanArticle({ ...fanArticle, category: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                  >
                    <option>Fan Opinion</option>
                    <option>Match Recap</option>
                    <option>WrestleMania Rumor</option>
                    <option>Historical Retrospective</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Article Story Content</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Write your in-depth perspective, match thoughts, or dream booking..."
                    value={fanArticle.content}
                    onChange={(e) => setFanArticle({ ...fanArticle, content: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500 font-sans"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-xs uppercase tracking-wider text-white transition-colors cursor-pointer"
                >
                  Publish Article to Universe
                </button>
              </form>
            )}
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="mt-10 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Breaking News', 'Raw', 'SmackDown', 'Corporate', 'Fan Opinion'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs" />
            <input
              type="text"
              placeholder="Search news & articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* News Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => {
            const storyLikes = likes[story.id] || 56
            return (
              <article
                key={story.id}
                onClick={() => setSelectedArticleModal(story)}
                className="rounded-2xl bg-[#0f1118] border border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-red-500/50 transition-all hover:shadow-2xl group cursor-pointer"
              >
                <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
                  <img
                    src={story.image}
                    alt={story.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/superstars/cody-rhodes.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118] via-transparent to-black/30"></div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-red-600 text-white font-bold text-[10px] uppercase">
                    {story.category}
                  </span>
                  <span className="absolute bottom-3 right-3 text-[11px] text-zinc-300 font-bold bg-black/60 px-2 py-0.5 rounded">
                    {story.readTime}
                  </span>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <span className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl flex items-center gap-2">
                      <FaEye /> Read Full Story
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] text-zinc-400 mb-1">
                      {story.date} • By <span className="text-zinc-200 font-semibold">{story.author}</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                      {story.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-3 mt-2 leading-relaxed">
                      {story.summary || story.content}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                    <button
                      onClick={(e) => handleLike(e, story.id)}
                      className="flex items-center gap-1.5 hover:text-red-400 font-bold cursor-pointer transition-colors"
                    >
                      <FaThumbsUp className="text-red-500" /> {storyLikes} Cheers
                    </button>
                    <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                      Read Story <FaArrowRight className="text-[10px]" />
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticleModal && (
        <NewsArticleModal
          article={selectedArticleModal}
          onClose={() => setSelectedArticleModal(null)}
        />
      )}

      <Footer />
    </div>
  )
}
