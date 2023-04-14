// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR0kohdwFcwtb9p1EQYkMmccVi-RFOOso",
  authDomain: "expense-tracker-4c17f.firebaseapp.com",
  projectId: "expense-tracker-4c17f",
  storageBucket: "expense-tracker-4c17f.appspot.com",
  messagingSenderId: "180331463777",
  appId: "1:180331463777:web:0d9626bf435c04391c5620",
  measurementId: "G-RT6TXDYG06",
};

const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app);
export { fireDb, app };
