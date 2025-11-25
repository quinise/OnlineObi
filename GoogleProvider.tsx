// Google sign-in helper. Uses the centralized `auth` exported from firebase.config.
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './firebase.config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    // const user = res.user;
    // console.log("user", user);
  } catch (err) {
    console.error(err);
  }
};