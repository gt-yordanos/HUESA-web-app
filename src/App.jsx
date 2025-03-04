import { useState } from 'react'
import './App.css'
import Nav from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import MeetOurTeam from './components/MeetOurTeam';
import Footer from './components/Footer'
function App() {
 
  return (
    <>
      <Nav/>
      <Hero/>
      <About/>
      <MeetOurTeam/>
      <Footer/>
    </>
  )
}

export default App
