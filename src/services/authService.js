import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc, runTransaction } from 'firebase/firestore';
import { auth, db } from './firebase';

const googleProvider = new GoogleAuthProvider();

export const authService = {
  // Check if username is available
  checkUsername: async (username) => {
    const usernameRef = doc(db, 'usernames', username.toLowerCase());
    const snapshot = await getDoc(usernameRef);
    return !snapshot.exists();
  },

  // Signup with username reservation
  signup: async (email, password, username, fullName) => {
    const usernameLower = username.toLowerCase();
    
    // Use a transaction to ensure username uniqueness atomically
    return await runTransaction(db, async (transaction) => {
      const usernameRef = doc(db, 'usernames', usernameLower);
      const usernameDoc = await transaction.get(usernameRef);
      
      if (usernameDoc.exists()) {
        throw new Error('Username already taken');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Create user profile
      const userRef = doc(db, 'users', uid);
      transaction.set(userRef, {
        uid,
        email,
        username: usernameLower,
        name: fullName,
        createdAt: new Date().toISOString(),
        profileImage: null,
        bio: ''
      });

      // Reserve username
      transaction.set(usernameRef, { uid });

      // Initialize empty portfolio
      const portfolioRef = doc(db, 'portfolios', uid);
      transaction.set(portfolioRef, {
        uid,
        updatedAt: new Date().toISOString(),
        sections: {
          skills: [],
          projects: [],
          experience: [],
          education: []
        },
        theme: 'default'
      });

      return userCredential.user;
    });
  },

  login: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  loginWithGoogle: async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user already exists in our 'users' collection
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // For Google login, we might need to prompt for a username later
      // For now, we'll flag it or use a temporary one
      return { user, isNewUser: true };
    }
    
    return { user, isNewUser: false };
  },

  logout: () => {
    return signOut(auth);
  },

  onAuthChange: (callback) => {
    return onAuthStateChanged(auth, callback);
  }
};
