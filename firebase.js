import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM9EjlAjkcCDWr0LUuBbMhsHCHKnnq4nY",
  authDomain: "anandwan-cdd4f.firebaseapp.com",
  projectId: "anandwan-cdd4f",
  storageBucket: "anandwan-cdd4f.firebasestorage.app",
  messagingSenderId: "763926644033",
  appId: "1:763926644033:web:9be77967cd9f5e65fbcdc0",
  measurementId: "G-5LG46BS2RT"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)