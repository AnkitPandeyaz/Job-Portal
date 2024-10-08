
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
 apiKey: "AIzaSyAOQ0D6kuk6OanryvzODhIiA3VLkIX78ms",
  authDomain: "fit-it-782e9.firebaseapp.com",
  databaseURL: "https://fit-it-782e9-default-rtdb.firebaseio.com",
  projectId: "fit-it-782e9",
  storageBucket: "fit-it-782e9.appspot.com",
  messagingSenderId: "846087500602",
  appId: "1:846087500602:web:af177cb0995ba9d4031603"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

