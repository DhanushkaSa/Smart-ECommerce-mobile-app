import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use

// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA-SZqTYUXcUXTPgB-HcaiwXms1Hls90vM",
  authDomain: "smart-e-commerce-app-34a8c.firebaseapp.com",
  projectId: "smart-e-commerce-app-34a8c",
  storageBucket: "smart-e-commerce-app-34a8c.firebasestorage.app",
  messagingSenderId: "827153270506",
  appId: "1:827153270506:web:4b10a4d9a1b33e6dc47993",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
