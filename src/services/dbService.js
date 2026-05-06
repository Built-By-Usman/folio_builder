import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  limit,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';

export const dbService = {
  // Get user profile by UID
  getUserProfile: async (uid) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },

  // Get portfolio by UID
  getPortfolio: async (uid) => {
    const docRef = doc(db, 'portfolios', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },

  // Update portfolio data
  updatePortfolio: async (uid, data) => {
    const docRef = doc(db, 'portfolios', uid);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  },

  // Get portfolio by username (for public page)
  getPortfolioByUsername: async (username) => {
    // 1. Find user by username
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username.toLowerCase()), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return null;
    
    const userData = querySnapshot.docs[0].data();
    const uid = userData.uid;
    
    // 2. Get portfolio by UID
    const portfolioRef = doc(db, 'portfolios', uid);
    const portfolioSnap = await getDoc(portfolioRef);
    
    return {
      user: userData,
      portfolio: portfolioSnap.exists() ? portfolioSnap.data() : null
    };
  },

  // Search users by name or username
  searchUsers: async (searchTerm) => {
    const term = searchTerm.toLowerCase();
    const usersRef = collection(db, 'users');
    
    // Firestore has limited text search, so we'll do a simple prefix search
    // For full-text search, Algolia is usually recommended, but this works for basic needs
    const q = query(
      usersRef, 
      where('username', '>=', term), 
      where('username', '<=', term + '\uf8ff'),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  }
};
