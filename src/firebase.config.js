// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuZKKhR58gZgF7Jc4RpzST0WUfw_evnqc",
  authDomain: "clone-b3453.firebaseapp.com",
  projectId: "clone-b3453",
  storageBucket: "clone-b3453.appspot.com",
  messagingSenderId: "597798195262",
  appId: "1:597798195262:web:65027e1a00c0792257016f",
  measurementId: "G-H5GBSLTBHF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig