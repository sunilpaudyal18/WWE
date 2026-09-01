import React, { useState, useEffect } from 'react'
import { FaDownload, FaTimes, FaMobileAlt, FaDesktop, FaCheckCircle, FaWifi } from 'react-icons/fa'
import WweLogo from './WweLogo'

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSGuide, setShowIOSGuide] = useState(false)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if already in standalone / PWA mode
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true)
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream
    setIsIOS(isIosDevice)

    // Listen for beforeinstallprompt on Chromium / Desktop / Android
    const handleBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
    }
    window.addEventListener('appinstalled', handleAppInstalled)

    // Network status listeners
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setIsInstalled(true)
      }
      setDeferredPrompt(null)
      setIsInstallable(false)
    } else if (isIOS) {
      setShowIOSGuide(true)
    }
  }

  if (isInstalled) return null

  return (
    <>
      {/* Offline Status Alert */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-600 text-black px-4 py-2 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg">
          <FaWifi className="animate-pulse" /> You are currently browsing WWE Universe in Offline Mode (Cached Data Active)
        </div>
      )}

      {/* Floating PWA Install Bar / Button */}
      {!dismissed && (isInstallable || isIOS) && (
        <div className="fixed bottom-4 left-4 z-40 animate-slideUp">
          <div className="bg-[#12141f]/95 backdrop-blur-xl border border-red-500/60 rounded-2xl p-3.5 shadow-2xl shadow-red-950/50 flex items-center gap-3 max-w-sm">
            <div className="w-10 h-10 rounded-xl bg-black border border-zinc-700 flex items-center justify-center shrink-0 p-1">
              <WweLogo className="h-6 w-auto" />
            </div>

            <div className="flex-1">
              <div className="text-xs font-heading font-black text-white uppercase leading-none">
                INSTALL WWE APP
              </div>
              <div className="text-[10px] text-zinc-400 font-medium">
                Faster zero-lag access & offline mode
              </div>
            </div>

            <button
              onClick={handleInstallClick}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer shrink-0 transition-all"
            >
              <FaDownload className="text-[10px]" /> Install
            </button>

            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-zinc-400 hover:text-white rounded cursor-pointer"
              aria-label="Dismiss"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        </div>
      )}

      {/* iOS Safari Guided Install Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12141f] border border-zinc-700 rounded-3xl max-w-md w-full p-6 text-center space-y-4 relative animate-fadeIn">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer"
            >
              <FaTimes />
            </button>

            <div className="w-14 h-14 mx-auto rounded-2xl bg-black border border-red-500 flex items-center justify-center p-2">
              <WweLogo className="h-8 w-auto" />
            </div>

            <h3 className="text-2xl font-heading font-black text-white uppercase">
              INSTALL ON APPLE IOS
            </h3>
            <p className="text-xs text-zinc-300">
              Install the WWE Universe PWA directly to your iPhone / iPad Home Screen:
            </p>

            <div className="space-y-3 text-left text-xs bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shrink-0 text-[10px]">1</span>
                <span className="text-zinc-300">Tap the <span className="font-bold text-white">Share icon (⎋)</span> at the bottom of Safari browser.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shrink-0 text-[10px]">2</span>
                <span className="text-zinc-300">Scroll down and tap <span className="font-bold text-amber-400">"Add to Home Screen" (➕)</span>.</span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </>
  )
}
