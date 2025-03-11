import { Route, Routes } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import Events from './pages/Events';
import Register from './pages/Register';
import Library from './pages/Library';
import Nav from './components/Navbar';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import Association from './pages/Association';
import Members from './pages/Members';
import ManageEvents from './pages/ManageEvents';
import Certificates from './pages/Certificates';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './layouts/AdminLayout';

// Import ProtectedRoute
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Member Routes */}
      <Route path="/" element={<><Nav /><Home /><Footer /></>} />
      <Route path="/events" element={<><Nav /><Events /><Footer /></>} />
      <Route path="/register" element={<><Nav /><Register /><Footer /></>} />
      <Route path="/library" element={<><Nav /><Library /><Footer /></>} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protecting Admin Routes */}
      <Route 
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin/association"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Association />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin/members"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Members />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin/manage-events"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ManageEvents />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin/certificates"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Certificates />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
    
  );
}

export default App;