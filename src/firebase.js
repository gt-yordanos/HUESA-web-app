import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyC162akrTRjU23NCPqlOpmpTF73EXsQH0I",
  authDomain: "huesaweb.firebaseapp.com",
  projectId: "huesaweb",
  storageBucket: "huesaweb.appspot.com",
  messagingSenderId: "917506839265",
  appId: "1:917506839265:web:eda471a4a4d957f221dda0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // Authentication
const db = getFirestore(app); // Firestore Database
const storage = getStorage(app); // Firebase Storage (optional)

// Export the Firebase services for use in your app
export { auth, db, storage };