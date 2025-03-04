import { useState } from 'react'
import './App.css'
import Nav from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import MeetOurTeam from './components/MeetOurTeam';
function App() {
 
  return (
    <>
      <Nav/>
      <Hero/>
      <About/>
      <MeetOurTeam/>
    </>
  )
}

export default App
