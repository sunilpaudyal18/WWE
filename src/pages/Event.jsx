import React, { useState } from 'react'
import wweev from '../assets/event.jpg'

function Event() {
  // State for form inputs
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    description: '',
  })

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!eventData.title || !eventData.date || !eventData.description) {
      alert('Please fill all fields!')
      return
    }

    console.log('Event submitted:', eventData)
    alert(`Event "${eventData.title}" has been created successfully!`)

    // Reset form
    setEventData({
      title: '',
      date: '',
      description: '',
    })
  }

  return (
    <div
        style={{
                backgroundImage: `url(${wweev})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
              }}
              className="flex items-center"
            >
    <div className="max-w-2xl p-8 mx-auto mt-12 text-white bg-gray-900 border border-red-500 shadow-2xl rounded-2xl">
      <h1 className="mb-6 text-3xl font-bold text-center text-red-500">
        Create a New Event
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Event Description"
          className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        ></textarea>

        <button className="w-full py-3 font-bold transition bg-red-600 rounded-xl hover:bg-red-700">
          Submit Event
        </button>
      </form>
    </div>
    </div>
  )
}

export default Event
