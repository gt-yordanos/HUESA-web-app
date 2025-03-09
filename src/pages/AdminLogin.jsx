import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth() || {}; 

  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        if (idTokenResult.claims.admin) {
          navigate('/admin');
        }
      }).catch((error) => {
        console.log("Error fetching user claims:", error);
      });
    }
  }, [user, navigate]);

 
const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const idTokenResult = await user.getIdTokenResult();

    if (idTokenResult.claims.admin) {
      toast.success('Login Successful!');
      localStorage.setItem('authToken', await user.getIdToken());
      navigate('/admin');
    } else {
      toast.error('You are not authorized to access the admin area.');
    }
  } catch (error) {
    if (error.code === 'auth/invalid-credential') {
      toast.error('Invalid credentials. Please check your email and password.');
    } else if (error.code === 'auth/too-many-requests') {
      toast.error('Too many requests. Please try again later.');
    } else {
      toast.error('Error: ' + error.message);
    }
  }

  setLoading(false);
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="w-full max-w-md p-8 bg-base-300 shadow-lg rounded-lg">
        <h1 className="m-auto text-4xl text-center font-bold">HUESA</h1>
        <h2 className="mt-4 text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {/* Email and Password Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full mt-2"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full mt-2"
            />
          </div>

          <button type="submit" className="btn btn-info w-full" disabled={loading}>
            {loading ? (
              <div className="spinner-border text-light" role="status">
               <span className="loading loading-spinner loading-md text-info"></span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
