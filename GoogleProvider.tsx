// This file includes the code tha connects the app to the Firebase/Google API
// To use, create and import a firebase.config.tsx file with the project's credentials

import { firebaseConfig } from './firebase.config';
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    // const user = res.user;
    // console.log("user", user);
  } catch (err) {
    console.error(err);
  }
};