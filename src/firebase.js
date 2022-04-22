// Import the functions you need from the SDKs you need
import firebase from "firebase";
import 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdBxm8bT3-2P7xncbMXUf7ZQ60uOSnI2g",
  authDomain: "crud-basico-react-bp-21e9f.firebaseapp.com",
  projectId: "crud-basico-react-bp-21e9f",
  storageBucket: "crud-basico-react-bp-21e9f.appspot.com",
  messagingSenderId: "989286843983",
  appId: "1:989286843983:web:9fb443d0437236cd594c3a",
  measurementId: "G-2GZBCKC880"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}