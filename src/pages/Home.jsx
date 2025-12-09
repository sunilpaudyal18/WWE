// ... other imports
import React from 'react'
import Footer from '../COMPONENTS/Footer.jsx'
import Banner from '../COMPONENTS/UI/Banner'
import Cards from '../COMPONENTS/UI/Cards'
import GetData from '../../HOC/Custome/GetData'
import { useNavigate } from 'react-router-dom'
import smackdownImage from "../assets/smackdown.jpg"
import rawImage from "../assets/Raw.jpg"

function Home() {
  const navigate = useNavigate()
  const data = GetData('services')

  const goToAbout = () => {
    navigate('/about')
  }

  return (
    <div className="min-h-screen pb-10 bg-gray-900">
      <a href="https://www.wwe.com/" target="_blank" rel="noopener noreferrer">
        <Banner
          title="WWE Universe"
          subtitle="Welcome to the Action"
          description="Experience the thrill, the power, and the spectacle of WWE! Join now and be part of the universe."
          className="text-white"
        />
      </a>

      <div className="grid max-w-6xl grid-cols-1 gap-8 px-4 mx-auto mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((val, i) => (
          <Cards
            key={i}
            title={val.title}
            description={val.summary}
            image={val?.coverImage?.url}
            className="overflow-hidden transition-transform duration-300 bg-gray-800 shadow-lg hover:scale-105 rounded-xl"
          />
        ))}
      </div>

     
      <div className="grid max-w-6xl grid-cols-1 gap-10 px-4 mx-auto mt-16 md:grid-cols-2">

       
        
          <div 
            className="bg-center bg-cover relative h-64 transition-transform duration-300 shadow-2xl cursor-pointer rounded-2xl hover:scale-105"
            style={{ backgroundImage: `url(${smackdownImage})` }} 
          >
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-opacity-50">
              <h2 className="mb-2 text-2xl font-bold text-red-500">SMACKDOWN</h2>
              <p className="text-white">
               WWE SmackDown is the most viewed television show on Friday nights in the United States...
              </p>
              <p className="text-white px-8 py-2 mt-4 font-bold text-center transition-all duration-300 bg-red-600 rounded-full shadow-lg hover:bg-red-700">
              <a href="https://www.wwe.com/shows/smackdown" target="_blank" rel="noopener noreferrer">Learn More</a>
              </p>
            </div>
          </div>
        

       
        
          <div
            className="bg-center bg-cover relative h-64 transition-transform duration-300 shadow-2xl cursor-pointer rounded-2xl hover:scale-105"
            style={{ backgroundImage: `url(${rawImage})` }}
          >
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-opacity-50">
              <h2 className="mb-2 text-2xl font-bold text-red-500">RAW</h2>
              <p className="text-white">
                WWE Raw is an American professional wrestling television program produced by WWE...
              </p>
              
              <p className="text-white px-8 py-2 mt-4 font-bold text-center transition-all duration-300 bg-red-600 rounded-full shadow-lg hover:bg-red-700">
                <a href="https://www.wwe.com/shows/raw" target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </p>
            </div>
          </div>
   

      </div>

     
      <div className="mt-20 text-center">
        <h2 className="mb-4 text-3xl font-bold text-red-500">Join the WWE Universe!</h2>
        <p className="mb-6 text-gray-300">Take your first step into the world of action, power, and excitement.</p>
        <button
          onClick={goToAbout}
          className="px-8 py-4 font-bold text-white transition-all duration-300 bg-red-600 rounded-full shadow-lg hover:bg-red-700"
        >
          Learn More
        </button>
      </div>
       <Footer />
    </div>
  )
}

export default Home
