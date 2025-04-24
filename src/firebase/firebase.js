
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
<<<<<<< HEAD
    apiKey: "AIzaSyDBis3Soy_Srz9saiEa408R6ncOewJjTxY",
    authDomain: "online-pizza-system.firebaseapp.com",
    projectId: "online-pizza-system",
    storageBucket: "online-pizza-system.firebasestorage.app",
    messagingSenderId: "386507580479",
    appId: "1:386507580479:web:ce03ea9e3f9ca61d64c48a"
=======

>>>>>>> 953fc76ab9f6a4508a10daa7288c32e0772cb5f3
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

