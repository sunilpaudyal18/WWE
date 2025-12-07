import React from 'react'
import { useParams } from 'react-router-dom'

function CardDetails() {
    const {id} = useParams()
    console.log(id)
  return (
    <div className='text-center mt-10 text-2xl font-semibold'>
     {id}
    </div>
  )
}


export default CardDetails
