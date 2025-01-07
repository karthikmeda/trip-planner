import { initializeApp } from 'firebase/app'; // Import the initializeApp function
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import { getAuth } from 'firebase/auth'; // Import Auth

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyATMnUKAK0h5yDXeEhDdjP942rc1Map6xE",
  authDomain: "trip-planner-1957e.firebaseapp.com",
  projectId: "trip-planner-1957e",
  storageBucket: "trip-planner-1957e.firebasestorage.app",
  messagingSenderId: "502958102866",
  appId: "1:502958102866:web:05760d95ebb4e718e1028b",
  measurementId: "G-F2EKQHBK3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore and Auth instances
const db = getFirestore(app);
const auth = getAuth(app);

// Export the auth and db instances
export { auth, db };
