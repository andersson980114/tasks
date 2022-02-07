// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoYZu562ixO7ZG5gdIhy7gX8tvug8dDlc",
  authDomain: "task-1197b.firebaseapp.com",
  projectId: "task-1197b",
  storageBucket: "task-1197b.appspot.com",
  messagingSenderId: "283039556744",
  appId: "1:283039556744:web:7a7c66acd30cd902582b3d"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =  getFirestore();
export const storage =  getStorage(app);
