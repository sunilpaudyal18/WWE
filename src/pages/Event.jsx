import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UPCOMING_EVENTS, WWE_SHOWS } from '../data/wweData'
import Footer from '../COMPONENTS/Footer'
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaFire, FaBolt, FaCheckCircle, FaStar, FaInfoCircle, FaArrowLeft, FaVoteYea } from 'react-icons/fa'

export default function Event() {
  const navigate = useNavigate()
  const [selectedEventType, setSelectedEventType] = useState('All')
  const [ticketModalEvent, setTicketModalEvent] = useState(null)
  const [ticketPurchased, setTicketPurchased] = useState(false)
  const [ticketQuantity, setTicketQuantity] = useState(2)

  // Fan Event Alert form state
  const [eventAlertForm, setEventAlertForm] = useState({
    city: '',
    email: '',
    showInterest: 'WrestleMania'
  })
  const [alertSuccess, setAlertSuccess] = useState(false)

  const handleTicketSubmit = (e) => {
    e.preventDefault()
    setTicketPurchased(true)
    setTimeout(() => {
      setTicketPurchased(false)
      setTicketModalEvent(null)
    }, 3000)
  }

  const handleAlertSubmit = (e) => {
    e.preventDefault()
    if (eventAlertForm.city && eventAlertForm.email) {
      setAlertSuccess(true)
      setTimeout(() => {
        setAlertSuccess(false)
        setEventAlertForm({ city: '', email: '', showInterest: 'WrestleMania' })
      }, 4000)
    }
  }

  return (
    <div className="min-h-screen bg-[#08090d] text-white pt-28 pb-12">
      {/* Header Banner with Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
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

        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <FaCalendarAlt /> Official Tour & PLE Calendar
          </div>
          <h1 className="text-5xl sm:text-6xl font-heading font-black tracking-wide uppercase">
            WWE LIVE SHOWS & <span className="wwe-text-gradient-red">PREMIUM LIVE EVENTS</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto mt-2">
            Experience the earth-shaking live energy in person. Reserve official ringside seats, VIP priority passes, and view full confirmed match cards.
          </p>

          {/* Filter Badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {['All', 'Premium Live Events', 'Weekly Shows'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedEventType(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedEventType === tab
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Featured PLE: WrestleMania 42 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-950 via-[#10121a] to-zinc-950 border border-red-500/50 shadow-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-extrabold uppercase tracking-wider">
                <FaStar /> FEATURED EVENT OF THE YEAR
              </div>
              <h2 className="text-4xl sm:text-6xl font-heading font-black text-white leading-none">
                WRESTLEMANIA 42
              </h2>
              <p className="text-base text-amber-400 font-bold uppercase tracking-wide">
                "The Showcase of the Immortals" • Las Vegas, NV
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed max-w-xl">
                Witness history at Allegiant Stadium as the greatest champions clash on the grandest stage of them all across two blockbuster nights.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-zinc-300">
                <span className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-2 rounded-xl border border-zinc-800">
                  <FaCalendarAlt className="text-red-500" /> April 18 - 19, 2026
                </span>
                <span className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-2 rounded-xl border border-zinc-800">
                  <FaMapMarkerAlt className="text-red-500" /> Allegiant Stadium, Las Vegas
                </span>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => setTicketModalEvent(UPCOMING_EVENTS[0])}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <FaTicketAlt /> Get Priority Pass Tickets
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-zinc-700 shadow-xl">
                <img
                  src={UPCOMING_EVENTS[0].banner}
                  alt="WrestleMania 42"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-bold text-amber-400 uppercase">Confirmed Main Event</span>
                  <p className="font-heading text-lg font-bold text-white">Cody Rhodes (c) vs Roman Reigns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Events List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-12">
        {(selectedEventType === 'All' || selectedEventType === 'Premium Live Events') && (
          <div>
            <h3 className="text-3xl font-heading font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
              <span className="w-2.5 h-6 bg-red-600 rounded-sm"></span> UPCOMING PREMIUM LIVE EVENTS (PLE)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {UPCOMING_EVENTS.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl bg-[#0f1118] border border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all hover:shadow-2xl group"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                    <img
                      src={event.banner}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118] via-transparent to-black/30"></div>
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 text-amber-400 font-bold text-xs uppercase border border-zinc-700">
                      {event.status}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-2xl font-heading font-black text-white group-hover:text-red-400 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-xs text-zinc-400 italic mb-3">"{event.tagline}"</p>

                      <div className="space-y-1.5 text-xs text-zinc-300">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-red-500" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-red-500" />
                          <span>{event.venue} • {event.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Match Card Preview */}
                    {event.matches && event.matches.length > 0 && (
                      <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800/80 text-xs">
                        <span className="text-[10px] font-bold uppercase text-amber-400 block mb-1">Featured Card</span>
                        <p className="text-white font-semibold truncate">{event.matches[0].matchTitle}</p>
                        <p className="text-zinc-400 text-[11px] truncate">{event.matches[0].wrestlerA} vs {event.matches[0].wrestlerB}</p>
                      </div>
                    )}

                    <button
                      onClick={() => setTicketModalEvent(event)}
                      className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FaTicketAlt /> Select Seats & Tickets
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(selectedEventType === 'All' || selectedEventType === 'Weekly Shows') && (
          <div>
            <h3 className="text-3xl font-heading font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
              <span className="w-2.5 h-6 bg-blue-600 rounded-sm"></span> WEEKLY LIVE TELEVISION BROADCASTS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WWE_SHOWS.map((show) => (
                <div
                  key={show.id}
                  className="rounded-2xl bg-[#0f1118] border border-zinc-800 p-6 flex flex-col justify-between"
                >
                  <div>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 text-xs font-bold uppercase">
                      {show.network}
                    </span>
                    <h4 className="text-3xl font-heading font-black text-white mt-3 mb-1">
                      {show.name}
                    </h4>
                    <p className="text-xs text-red-400 font-bold mb-4 flex items-center gap-1.5">
                      <FaBolt /> {show.airTime}
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      {show.tagline}
                    </p>
                  </div>

                  <button
                    onClick={() => setTicketModalEvent({ title: show.name, venue: "Live Arena Tour", location: "Global Tour", date: show.airTime })}
                    className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Find Nearby Taping Tickets
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fan City Tour Alert Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-3xl font-heading font-black uppercase text-white">
              NEVER MISS A SHOW IN <span className="text-red-500">YOUR CITY</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Sign up for localized WWE Live Tour presale notifications, meet & greet alerts, and priority ticket drops.
            </p>
          </div>

          {alertSuccess ? (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500 text-red-300 font-bold text-center flex items-center justify-center gap-2">
              <FaCheckCircle className="text-lg" /> Alert registered! We will notify you when WWE arrives in your city.
            </div>
          ) : (
            <form onSubmit={handleAlertSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                placeholder="Enter your City / State"
                value={eventAlertForm.city}
                onChange={(e) => setEventAlertForm({ ...eventAlertForm, city: e.target.value })}
                className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
              <input
                type="email"
                required
                placeholder="Your Email Address"
                value={eventAlertForm.email}
                onChange={(e) => setEventAlertForm({ ...eventAlertForm, email: e.target.value })}
                className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="py-3.5 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-xs uppercase tracking-wider text-white transition-colors cursor-pointer"
              >
                Set Tour Alert
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Ticket Selection Simulation Modal */}
      {ticketModalEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative animate-fadeIn">
            <button
              onClick={() => setTicketModalEvent(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white text-lg font-bold cursor-pointer"
            >
              ✕
            </button>

            {ticketPurchased ? (
              <div className="text-center py-8 space-y-4">
                <FaCheckCircle className="text-5xl text-amber-400 mx-auto animate-bounce" />
                <h3 className="text-3xl font-heading font-black text-white uppercase">
                  TICKETS RESERVED!
                </h3>
                <p className="text-xs text-zinc-300">
                  You have successfully claimed {ticketQuantity} Priority Pass tickets for <span className="font-bold text-white">{ticketModalEvent.title}</span>. Confirmation sent to your inbox.
                </p>
              </div>
            ) : (
              <div>
                <span className="px-3 py-1 bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-bold rounded uppercase">
                  WWE Priority Pass Portal
                </span>
                <h3 className="text-3xl font-heading font-black text-white mt-3 mb-1 uppercase">
                  {ticketModalEvent.title}
                </h3>
                <p className="text-xs text-zinc-400 mb-6">{ticketModalEvent.venue} • {ticketModalEvent.location} • {ticketModalEvent.date}</p>

                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Select Seating Tier</label>
                    <select className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500">
                      <option>Ringside Floor Seat (Rows 1-5) - $850</option>
                      <option>Lower Bowl Center Arena - $350</option>
                      <option>VIP Priority Hospitality Suite - $1,200</option>
                      <option>Standard Club Level - $175</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Number of Tickets</label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 4, 6].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setTicketQuantity(num)}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold cursor-pointer ${
                            ticketQuantity === num
                              ? 'bg-red-600 text-white'
                              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                          }`}
                        >
                          {num} {num === 1 ? 'Pass' : 'Passes'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block">Total Est.</span>
                      <span className="text-2xl font-heading font-black text-amber-400">${ticketQuantity * 350}</span>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
