import { Route, Routes } from 'react-router-dom';
import './App.css';

// Member Pages
import Home from './pages/Home';
import Events from './pages/Events';
import Register from './pages/Register';
import Library from './pages/Library';
import Nav from './components/Navbar';
import Footer from './components/Footer';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import Association from './pages/Association';
import Members from './pages/Members';
import PostEvents from './pages/PostEvents'; // Admin version
import Certificates from './pages/Certificates';

// Layouts
import AdminLayout from './layouts/AdminLayout'; // Admin Layout

function App() {
  return (
    <Routes>
      {/* Member Routes with Navbar and Footer */}
      <Route path="/" element={<><Nav /><Home /><Footer /></>} />
      <Route path="/events" element={<><Nav /><Events /><Footer /></>} />
      <Route path="/register" element={<><Nav /><Register /><Footer /></>} />
      <Route path="/library" element={<><Nav /><Library /><Footer /></>} />

      {/* Admin Routes with Admin Sidebar */}
      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/association" element={<AdminLayout><Association /></AdminLayout>} />
      <Route path="/admin/members" element={<AdminLayout><Members /></AdminLayout>} />
      <Route path="/admin/post-events" element={<AdminLayout><PostEvents /></AdminLayout>} />
      <Route path="/admin/certificates" element={<AdminLayout><Certificates /></AdminLayout>} />
    </Routes>
  );
}

export default App;