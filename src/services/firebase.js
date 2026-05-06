import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrUC3JQXO8D1pLdC1SLt0vofGm2fItpCk",
  authDomain: "sample-project-1-448e0.firebaseapp.com",
  projectId: "sample-project-1-448e0",
  storageBucket: "sample-project-1-448e0.firebasestorage.app",
  messagingSenderId: "963958457276",
  appId: "1:963958457276:web:a8679927642cefc8b9a1b9",
  measurementId: "G-T62HNEQ6CD"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
