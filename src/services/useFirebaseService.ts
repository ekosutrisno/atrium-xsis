import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

var firebaseConfig = {
   apiKey: "AIzaSyCU_BTquhMOq50kdi9eeppZazypPQtIoTw",
   authDomain: "atrium-xsis.firebaseapp.com",
   projectId: "atrium-xsis",
   storageBucket: "atrium-xsis.appspot.com",
   messagingSenderId: "167134644678",
   appId: "1:167134644678:web:4365fd1a5b1d073cf34ac7"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export {
   auth,
   db,
   storage
}