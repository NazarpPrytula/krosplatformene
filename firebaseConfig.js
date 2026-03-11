// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxapgJwKoKwOLmAFq9gcedvHYUxabQ82A",
  authDomain: "vitosik-test-cross.firebaseapp.com",
  projectId: "vitosik-test-cross",
  storageBucket: "vitosik-test-cross.firebasestorage.app",
  messagingSenderId: "794167716122",
  appId: "1:794167716122:web:0982215df3045ecd9424a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

console.log("=== FIREBASE DB OBJECT ===", db); // Додай це!