import React from 'react'
import { useLocation } from 'react-router-dom'

function Banner({ title, subtitle, description }) {
  const location = useLocation()
  console.log(location)
  return (

    <div className='h-screen bg-red-500'>
      <div className='h-full relative'>
        <img src='https://wallpaperaccess.com/full/1077066.png' className='h-full w-full object-cover' alt='Banner background' />

        <div className='absolute top-1/2  flex flex-col items-center p-8  left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-white  bg-black/30 rounded-xl '>
          <div className='text-3xl font-bold mb-2'> {title}</div>
          <div className='text-xl mb-2'>{subtitle}</div>
          <div className='text-md max-w-xl text-center'>{description}</div>
        </div>
      </div>

    </div>

  )
}

export default Banner