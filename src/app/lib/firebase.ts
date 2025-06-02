
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyD1LnF0eripYGuNJ4_RaeJJf44_a0T5boM",
  authDomain: "journal-app-366c0.firebaseapp.com", 
  projectId: "journal-app-366c0",
  storageBucket: "journal-app-366c0.appspot.com",  
  messagingSenderId: "175375682757",
  appId: "1:175375682757:web:53f8909881798c74ceb4ac",
  measurementId: "G-6CBRGHV8HV"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


if (typeof window !== "undefined") {
  getAnalytics(app);
}


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
