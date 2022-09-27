import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBvGxoRZYuRULESX-0jmy3fCaEZDuNkagg',
    authDomain: 'skillfactory-react-cb07e.firebaseapp.com',
    projectId: 'skillfactory-react-cb07e',
    storageBucket: 'killfactory-react-cb07e.appspot.com',
    messagingSenderId: '794523386073',
    appId: '1:794523386073:web:602737a243237994193ec8',
};

const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
export const FirebaseStorage = getStorage( FirebaseApp );
