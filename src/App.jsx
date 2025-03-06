import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MeetOurTeam from './components/MeetOurTeam';
import Footer from './components/Footer';
import Events from './components/Events';  // Import the Events component

function App() {
  return (
   <>
      <Nav />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<MeetOurTeam />} />
        <Route path="/events" element={<Events />} />
        <Route path="/register" element={<div>Register Page</div>} />
      </Routes>
      <Footer />
   </>
  );
}

export default App;
