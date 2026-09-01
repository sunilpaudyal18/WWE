import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../COMPONENTS/Footer'
import socialLinks from '../data/socialLinks'
import { FaBuilding, FaDumbbell, FaEnvelope, FaTicketAlt, FaFileContract, FaCheckCircle, FaMapMarkerAlt, FaPhoneAlt, FaArrowLeft, FaShieldAlt, FaUserTie, FaLinkedin, FaGithub, FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaCode } from 'react-icons/fa'

export default function Contact() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('contracts')
  const [submittedContract, setSubmittedContract] = useState(null)
  const [submittedGeneral, setSubmittedGeneral] = useState(false)

  // Contract & Tryout Form State
  const [contractForm, setContractForm] = useState({
    fullName: '',
    legalName: '',
    email: '',
    phone: '',
    age: '',
    height: '',
    weight: '',
    category: 'NIL Collegiate Athlete',
    experienceYears: '3-5 Years',
    athleticAchievements: '',
    highlightVideoUrl: '',
    representation: 'Self-Represented',
    agentContact: '',
    motivationStatement: ''
  })

  // General VIP / Corporate Form State
  const [generalForm, setGeneralForm] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'VIP Ringside Hospitality Experience',
    message: ''
  })

  const handleSubmitContract = (e) => {
    e.preventDefault()
    const trackingId = `WWE-TALENT-${Math.floor(100000 + Math.random() * 900000)}`
    setSubmittedContract({
      ...contractForm,
      trackingId,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    })
  }

  const handleSubmitGeneral = (e) => {
    e.preventDefault()
    setSubmittedGeneral(true)
    setTimeout(() => {
      setSubmittedGeneral(false)
      setGeneralForm({ name: '', email: '', organization: '', inquiryType: 'VIP Ringside Hospitality Experience', message: '' })
    }, 4000)
  }

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
            <FaFileContract /> WWE Talent Relations & Corporate Portals
          </div>
          <h1 className="text-5xl sm:text-6xl font-heading font-black tracking-wide uppercase">
            WWE CONTRACT & <span className="wwe-text-gradient-red">TALENT RELATIONS</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            Submit your official WWE Performance Center contract application, request VIP priority booking, or reach global corporate headquarters in Stamford, CT.
          </p>

          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <button
              onClick={() => { setActiveTab('contracts'); setSubmittedContract(null); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'contracts'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <FaFileContract /> Superstar Contract & Tryouts
            </button>
            <button
              onClick={() => { setActiveTab('vip'); setSubmittedContract(null); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'vip'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <FaUserTie /> VIP Booking & Media Credentials
            </button>
            <button
              onClick={() => { setActiveTab('facilities'); setSubmittedContract(null); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'facilities'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <FaBuilding /> Global Performance Centers
            </button>
            <button
              onClick={() => { setActiveTab('developer'); setSubmittedContract(null); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'developer'
                  ? 'bg-amber-500 text-black font-extrabold shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <FaCode /> Built by Sunil Paudyal
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {/* Tab 1: Official Contract & Tryouts Form */}
        {activeTab === 'contracts' && !submittedContract && (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0f1118] border border-zinc-800 shadow-2xl">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Official WWE Talent Scouting & NIL Program
              </span>
              <h3 className="text-3xl font-heading font-black text-white uppercase">
                PERFORMANCE CENTER TALENT CONTRACT APPLICATION
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Please provide accurate legal identity and athletic tape. All applications are reviewed directly by the WWE Talent Relations evaluation board in Orlando, FL.
              </p>
            </div>

            <form onSubmit={handleSubmitContract} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Ring / Stage Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 'The Iron Phoenix' Cody Vance"
                    value={contractForm.fullName}
                    onChange={(e) => setContractForm({ ...contractForm, fullName: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="As shown on Passport / Driver's License"
                    value={contractForm.legalName}
                    onChange={(e) => setContractForm({ ...contractForm, legalName: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="talent@athletepro.com"
                    value={contractForm.email}
                    onChange={(e) => setContractForm({ ...contractForm, email: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={contractForm.phone}
                    onChange={(e) => setContractForm({ ...contractForm, phone: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Age (18+ Required)</label>
                  <input
                    type="number"
                    required
                    min="18"
                    max="45"
                    placeholder="23"
                    value={contractForm.age}
                    onChange={(e) => setContractForm({ ...contractForm, age: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Height (e.g. 6'3")</label>
                  <input
                    type="text"
                    required
                    placeholder="6 ft 3 in (191 cm)"
                    value={contractForm.height}
                    onChange={(e) => setContractForm({ ...contractForm, height: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Billed Weight (lbs)</label>
                  <input
                    type="text"
                    required
                    placeholder="245 lbs (111 kg)"
                    value={contractForm.weight}
                    onChange={(e) => setContractForm({ ...contractForm, weight: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Scouting Category</label>
                  <select
                    value={contractForm.category}
                    onChange={(e) => setContractForm({ ...contractForm, category: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                  >
                    <option>NIL Collegiate Athlete (NCAA Division I)</option>
                    <option>Independent Wrestling Professional</option>
                    <option>Olympic Combat Sports (Freestyle Wrestling / Judo)</option>
                    <option>Powerlifting / Strongman / CrossFit Athlete</option>
                    <option>MMA / Mixed Martial Arts Fighter</option>
                    <option>Gymnastics / Acrobatics / Stunt Performer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Highlight Tape Reel URL (YouTube / Vimeo)</label>
                  <input
                    type="url"
                    required
                    placeholder="https://youtube.com/watch?v=..."
                    value={contractForm.highlightVideoUrl}
                    onChange={(e) => setContractForm({ ...contractForm, highlightVideoUrl: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Athletic Honors & Major Accolades</label>
                <input
                  type="text"
                  placeholder="e.g. NCAA All-American Heavyweight 2023, Golden Gloves Champion"
                  value={contractForm.athleticAchievements}
                  onChange={(e) => setContractForm({ ...contractForm, athleticAchievements: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Personal Statement & Microphone Charisma Statement</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Describe your athletic drive, work ethic, charisma, and why you will become a future WWE Champion..."
                  value={contractForm.motivationStatement}
                  onChange={(e) => setContractForm({ ...contractForm, motivationStatement: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500 font-sans"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 font-bold text-xs uppercase tracking-wider text-white shadow-xl transition-all cursor-pointer"
              >
                Submit Contract Application to WWE Talent Board 💥
              </button>
            </form>
          </div>
        )}

        {/* Contract Submission Summary Receipt */}
        {submittedContract && (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0f1118] border border-amber-500/50 shadow-2xl space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <FaCheckCircle className="text-5xl text-amber-400 mx-auto animate-bounce" />
              <span className="px-3 py-1 bg-amber-500 text-black font-extrabold text-xs uppercase rounded-full">
                Contract Dossier Registered
              </span>
              <h3 className="text-3xl font-heading font-black text-white uppercase mt-2">
                APPLICATION OFFICIAL RECEIPT
              </h3>
              <p className="text-xs text-zinc-300">
                Your dossier has been cataloged under Talent Tracking ID: <span className="text-amber-400 font-mono font-bold">{submittedContract.trackingId}</span>
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-zinc-800">
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px] block">Candidate Ring Name</span>
                  <span className="text-white font-bold text-sm">{submittedContract.fullName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px] block">Legal Name</span>
                  <span className="text-zinc-200 font-semibold">{submittedContract.legalName}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pb-3 border-b border-zinc-800">
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px] block">Height / Weight</span>
                  <span className="text-zinc-200 font-bold">{submittedContract.height} • {submittedContract.weight}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px] block">Background</span>
                  <span className="text-red-400 font-bold">{submittedContract.category}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px] block">Submission Date</span>
                  <span className="text-zinc-300 font-medium">{submittedContract.timestamp}</span>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 uppercase font-bold text-[10px] block">Reviewing Facility</span>
                <span className="text-zinc-200 font-medium">WWE Performance Center — 5055 Forsyth Commerce Rd, Orlando, FL 32807</span>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setSubmittedContract(null)}
                className="px-8 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Submit Another Candidate Application
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: VIP & Corporate Booking Inquiries */}
        {activeTab === 'vip' && (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0f1118] border border-zinc-800 shadow-2xl">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 block mb-1">
                Universe Concierge & Booking
              </span>
              <h3 className="text-3xl font-heading font-black text-white uppercase">
                VIP RINGSIDE EXPERIENCES & MEDIA CREDENTIALS
              </h3>
            </div>

            {submittedGeneral ? (
              <div className="p-6 rounded-2xl bg-red-950/60 border border-red-500 text-center space-y-2 animate-fadeIn">
                <FaCheckCircle className="text-4xl text-amber-400 mx-auto" />
                <h4 className="text-2xl font-heading font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-zinc-300">A WWE concierge representative will follow up via your contact email within 24 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitGeneral} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Representative Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={generalForm.name}
                      onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Corporate / Outlet Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@organization.com"
                      value={generalForm.email}
                      onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Company / Media Outlet</label>
                    <input
                      type="text"
                      placeholder="e.g. ESPN, TKO Hospitality, Sports Illustrated"
                      value={generalForm.organization}
                      onChange={(e) => setGeneralForm({ ...generalForm, organization: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Inquiry Department</label>
                    <select
                      value={generalForm.inquiryType}
                      onChange={(e) => setGeneralForm({ ...generalForm, inquiryType: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500"
                    >
                      <option>VIP Ringside Hospitality Experience (WrestleMania / SummerSlam)</option>
                      <option>Press & Media Credentials (PLE Access)</option>
                      <option>Global Brand Sponsorships & Commercial Partnerships</option>
                      <option>WWE Community & Charity Foundation Requests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Inquiry Specifications</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Detail your request, target dates, attendance party size, or coverage plans..."
                    value={generalForm.message}
                    onChange={(e) => setGeneralForm({ ...generalForm, message: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs outline-none focus:border-red-500 font-sans"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-xs uppercase tracking-wider text-white shadow-xl transition-all cursor-pointer"
                >
                  Transmit Official Inquiry to WWE Concierge
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 3: Global Headquarters & Performance Centers */}
        {activeTab === 'facilities' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#0f1118] border border-zinc-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center text-xl shrink-0">
                <FaBuilding />
              </div>
              <div>
                <h4 className="text-xl font-heading font-bold text-white">WWE Global Headquarters (Stamford, CT)</h4>
                <p className="text-xs text-zinc-400 mt-1">707 Washington Blvd, Stamford, CT 06901, United States</p>
                <p className="text-xs text-zinc-300 mt-2 font-medium">Corporate operations, broadcast production center, and executive offices of TKO Group.</p>
                <p className="text-xs text-red-400 flex items-center gap-1.5 mt-2 font-bold">
                  <FaPhoneAlt /> +1 (203) 352-8600
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0f1118] border border-zinc-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xl shrink-0">
                <FaDumbbell />
              </div>
              <div>
                <h4 className="text-xl font-heading font-bold text-white">WWE Performance Center (Orlando, FL)</h4>
                <p className="text-xs text-zinc-400 mt-1">5055 Forsyth Commerce Rd, Orlando, FL 32807, United States</p>
                <p className="text-xs text-zinc-300 mt-2 font-medium">Flagship 26,000 sq ft athlete development facility featuring 7 regulation rings, strength pavillion, and world-class sports science.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0f1118] border border-zinc-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center text-xl shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="text-xl font-heading font-bold text-white">WWE UK & EMEA International Hub (London)</h4>
                <p className="text-xs text-zinc-400 mt-1">10 Lower Thames St, London EC3R 6AF, United Kingdom</p>
                <p className="text-xs text-zinc-300 mt-2 font-medium">Coordinating international European live stadium tours and European talent scouting.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Creator & Lead Architect (Sunil Paudyal) */}
        {activeTab === 'developer' && (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0f1118] border border-amber-500/50 shadow-2xl space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-black font-extrabold text-xs uppercase rounded-full">
                <FaCode /> Creator & Lead Engineer
              </div>
              <h3 className="text-4xl font-heading font-black text-white uppercase mt-2">
                SUNIL PAUDYAL
              </h3>
              <p className="text-xs text-zinc-400 max-w-lg mx-auto">
                Full-Stack Software Engineer & Digital Architect behind the official WWE Universe Progressive Web Application.
              </p>
            </div>

            {/* Direct Connect Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 flex items-center gap-3 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg">
                  <FaWhatsapp />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-white group-hover:text-emerald-400">WhatsApp Direct</div>
                  <div className="text-[11px] text-zinc-400">+977 9867420439</div>
                </div>
              </a>

              <a
                href={`mailto:${socialLinks.email}`}
                className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 hover:border-red-400 flex items-center gap-3 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center text-lg">
                  <FaEnvelope />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-white group-hover:text-red-400">Direct Email</div>
                  <div className="text-[11px] text-zinc-400">{socialLinks.email}</div>
                </div>
              </a>

              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-400 flex items-center gap-3 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg">
                  <FaLinkedin />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-white group-hover:text-blue-400">LinkedIn Profile</div>
                  <div className="text-[11px] text-zinc-400">/in/18sunilpaudyal</div>
                </div>
              </a>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 flex items-center gap-3 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-800 text-white flex items-center justify-center text-lg">
                  <FaGithub />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-white group-hover:text-amber-400">GitHub Repositories</div>
                  <div className="text-[11px] text-zinc-400">/sunilpaudyal18</div>
                </div>
              </a>
            </div>

            {/* Social Grid */}
            <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-bold uppercase text-zinc-400 mr-2">Follow Sunil:</span>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-900 hover:bg-blue-600 text-zinc-300 hover:text-white rounded-xl text-sm transition-colors" title="Facebook">
                <FaFacebook />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-900 hover:bg-pink-600 text-zinc-300 hover:text-white rounded-xl text-sm transition-colors" title="Instagram">
                <FaInstagram />
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-900 hover:bg-sky-500 text-zinc-300 hover:text-white rounded-xl text-sm transition-colors" title="X (Twitter)">
                <FaTwitter />
              </a>
              <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-900 hover:bg-rose-600 text-zinc-300 hover:text-white rounded-xl text-sm transition-colors" title="TikTok">
                <FaTiktok />
              </a>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
