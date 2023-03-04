// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2fQ1l3c6TleDvTRdPqhSBEz-31m-DMUg",
  authDomain: "logger-f319c.firebaseapp.com",
  projectId: "logger-f319c",
  storageBucket: "logger-f319c.appspot.com",
  messagingSenderId: "941676354841",
  appId: "1:941676354841:web:c87b4d366d421bb889f988"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)