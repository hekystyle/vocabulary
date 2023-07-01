import { FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, initializeFirestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyAQL0RZ10JMzRmDVLVqyjqPK2OFpB2vJKI',
  authDomain: `vocabulary-dd9a2.firebaseapp.com`,
  projectId: 'vocabulary-dd9a2',
  storageBucket: `vocabulary-dd9a2.appspot.com`,
  appId: '1:541447909606:web:b33db90de6d40a7d524b27',
  measurementId: 'G-B3TBET59HH',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = initializeFirestore(firebaseApp, {});

export const useFirebaseAuth = (): Auth => auth;
export const useFirestore = (): Firestore => firestore;
