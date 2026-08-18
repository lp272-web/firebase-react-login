import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLZLuEadefYfXe4WRsPFlYfTsBO1B8FR8",
  authDomain: "project-1-5f42a.firebaseapp.com",
  projectId: "project-1-5f42a",
  storageBucket: "project-1-5f42a.firebasestorage.app",
  messagingSenderId: "943546368126",
  appId: "1:943546368126:web:0fff8afcdde8851ae2982f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);