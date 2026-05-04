import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY || 'your-api-key',
  authDomain: `${Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID || 'your-project-id',
  // Add other config properties if needed, like storageBucket, messagingSenderId, appId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };