import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Nav from './components/Navbar';
import Footer from './components/Footer';
import Events from './components/Events';
import Home from './pages/Home';

function App() {
  return (
   <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/events" element={<Events />} />
        <Route path="/register" element={<div>Register Page</div>} />
      </Routes>
      <Footer />
   </>
  );
}

export default App;
