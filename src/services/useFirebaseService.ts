import { getDatabase } from '@firebase/database';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, logEvent } from 'firebase/analytics';

var firebaseConfig = {
   apiKey: "AIzaSyCU_BTquhMOq50kdi9eeppZazypPQtIoTw",
   authDomain: "atrium-xsis.firebaseapp.com",
   projectId: "atrium-xsis",
   storageBucket: "atrium-xsis.appspot.com",
   messagingSenderId: "167134644678",
   appId: "1:167134644678:web:4365fd1a5b1d073cf34ac7"
};

const app = initializeApp(firebaseConfig);

/** Auth Instance */
const auth = getAuth(app)
auth.useDeviceLanguage();

const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');

const db = getFirestore(app);
const dbRealtime = getDatabase(app)
const storage = getStorage(app);

/** Sign With Google Provider */
const gProvider = new GoogleAuthProvider();

export {
   auth,
   db,
   gProvider,
   dbRealtime,
   storage,
   analytics
}

