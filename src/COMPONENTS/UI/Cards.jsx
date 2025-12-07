import React from 'react'
import { useNavigate } from 'react-router-dom'

function Cards({title,description,image}) {
    const navigate = useNavigate()

  return (
    <div className='grid gap-2 shadow-md border border-gray-100'>
      <img src={image} className='h-74 w-full object-cover' />
      <div className='p-4 flex flex-col gap-4'>
        <h1 className='text-xl font-semibold capitalize'>{title}</h1>
        <div className='line-clamp-3 text-gray-600'>{description}</div>
       
       <button
          onClick={() => navigate(`/card/${title}`)}
          className='border border-blue-400 text-blue-500 hover:bg-blue-50 transition px-6 py-2 rounded-md self-start'
        >
          Read more
        </button>
       </div>
    </div>
  )
}

export default Cards
