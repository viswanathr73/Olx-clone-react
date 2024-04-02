import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6bROc57r8ehOxQF-A6x_AXOy2ZfhSxGA",
  authDomain: "olxproject-fabd9.firebaseapp.com",
  projectId: "olxproject-fabd9",
  storageBucket: "olxproject-fabd9.appspot.com",
  messagingSenderId: "515204139302",
  appId: "1:515204139302:web:ebbd77fcbdc0b4159fd9e7",
  measurementId: "G-BX45SP7FDN"
};




export default firebase.initializeApp(firebaseConfig)
