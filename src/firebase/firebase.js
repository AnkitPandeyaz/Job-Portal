
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDBis3Soy_Srz9saiEa408R6ncOewJjTxY",
    authDomain: "online-pizza-system.firebaseapp.com",
    projectId: "online-pizza-system",
    storageBucket: "online-pizza-system.firebasestorage.app",
    messagingSenderId: "386507580479",
    appId: "1:386507580479:web:ce03ea9e3f9ca61d64c48a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

