import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Toolbar from './COMPONENTS/navigation/Toolbar'
import PwaInstallPrompt from './COMPONENTS/UI/PwaInstallPrompt'
import Home from './pages/Home'
import About from './pages/About'
import Superstars from './pages/Superstars'
import Champions from './pages/Champions'
import Event from './pages/Event'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import CardDetails from './pages/CardDetails'
import PageNotFound from './pages/PageNotFound'

// Auto scroll-to-top component on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <div className="min-h-screen bg-[#08090d] text-zinc-100 flex flex-col justify-between selection:bg-red-600 selection:text-white">
      <ScrollToTop />
      <Toolbar />
      <PwaInstallPrompt />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/superstars" element={<Superstars />} />
          <Route path="/champions" element={<Champions />} />
          <Route path="/event" element={<Event />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/card/:id" element={<CardDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
