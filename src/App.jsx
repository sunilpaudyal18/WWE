import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Event from './pages/Event'
import { Route, Routes } from 'react-router-dom'
import Toolbar from './COMPONENTS/navigation/Toolbar'
import PageNotFound from './pages/PageNotFound'
import CardDetails from './pages/CardDetails'

function App() {

  return (
    <>
    <Toolbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/About' element={<About />}></Route>
        <Route path='/card/:id' element={<CardDetails />} />
        <Route path='*' element={<PageNotFound />}/>
        <Route path='/Contact' element={<Contact />}></Route>
        <Route path='/Blog' element={<Blog />}></Route>
        <Route path='/Event' element={<Event />}></Route>
        
      </Routes>
<p>learn react</p>
    </>
  )
}

export default App
