// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0kTjfbNaGYeqOehFxgr9CAVdrFxZxIvk",
  authDomain: "netflixgpt-aa61c.firebaseapp.com",
  projectId: "netflixgpt-aa61c",
  storageBucket: "netflixgpt-aa61c.firebasestorage.app",
  messagingSenderId: "822355891042",
  appId: "1:822355891042:web:1e2b058f09c2d67dbb523b",
  measurementId: "G-F65SKMQGQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);