import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD1bIvypkwR9JIIyb8o5K_a7WekTjqJNdM",
    authDomain: "crwn-db-f31b6.firebaseapp.com",
    projectId: "crwn-db-f31b6",
    storageBucket: "crwn-db-f31b6.appspot.com",
    messagingSenderId: "1014610493184",
    appId: "1:1014610493184:web:a60b1cc89b913292eebde5",
    measurementId: "G-ZLLSWE1MSP"
  };

  firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;