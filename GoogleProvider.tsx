// Google sign-in helper. Uses the centralized `auth` exported from firebase.config.
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from './firebase.config';

const googleProvider = new GoogleAuthProvider();
// Always prompt the account chooser so users can pick which Google account to sign in with.
// This prevents automatic selection of a previously-signed-in account.
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error('signInWithPopup failed:', err);

    // Fallback to redirect when popup is blocked or unsupported in this environment.
    const code = (err as any)?.code;
    const popupErrorCodes = new Set([
      'auth/popup-blocked',
      'auth/popup-closed-by-user',
      'auth/cancelled-popup-request',
      'auth/operation-not-supported-in-this-environment'
    ]);

    if (popupErrorCodes.has(code)) {
      try {
        await signInWithRedirect(auth, googleProvider);
      } catch (redirectErr) {
        console.error('signInWithRedirect failed as fallback:', redirectErr);
      }
    }
  }
};

// Expose an explicit redirect sign-in for cases where popup flows are blocked
export const signInWithGoogleRedirect = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (err) {
    console.error('signInWithGoogleRedirect failed:', err);
  }
};