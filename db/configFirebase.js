import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYQp9P5DjtSOGMgUbcR2--56S5iZTGQkk",
  authDomain: "next-chat-app-bbeac.firebaseapp.com",
  projectId: "next-chat-app-bbeac",
  storageBucket: "next-chat-app-bbeac.appspot.com",
  messagingSenderId: "275509057488",
  appId: "1:275509057488:web:266e4e00aa9df521a60bd5",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
