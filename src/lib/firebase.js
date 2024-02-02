/* eslint no-use-before-define: 0 */  // --> OFF
import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// here I want to import the seed file.
// import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyD1E0T3uHeQPQyJYNiV3pP0v5YCVkh8PTQ",
  authDomain: "instagram-yt-62dad.firebaseapp.com",
  projectId: "instagram-yt-62dad",
  storageBucket: "instagram-yt-62dad.appspot.com",
  messagingSenderId: "1011081676377",
  appId: "1:1011081676377:web:3fb1e7ea89a66fd5321348"
};


const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//here is where I want to call the seed file(only once!)
//seedDatabase(firebase);

//console.log('firebase', firebase);

export { firebase, FieldValue };



