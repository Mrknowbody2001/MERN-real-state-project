// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_KEY,
  authDomain: "mern-real-estate-78bd7.firebaseapp.com",
  projectId: "mern-real-estate-78bd7",
  storageBucket: "mern-real-estate-78bd7.firebasestorage.app",
  messagingSenderId: "588069001129",
  appId: "1:588069001129:web:228894326eb7a0a4f156b8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
