// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLmjeZo_fjQZXnh8tY7Cd3D8alK23A8Mo",
  authDomain: "task-list-firebase-1189e.firebaseapp.com",
  projectId: "task-list-firebase-1189e",
  storageBucket: "task-list-firebase-1189e.appspot.com",
  messagingSenderId: "642509487855",
  appId: "1:642509487855:web:728b1a9c3b3136426d651a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app