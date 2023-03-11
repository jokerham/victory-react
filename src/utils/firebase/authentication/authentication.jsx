import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import { app } from '../app';
import { getUser, addUser } from '../firestore';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const authSignInWithGoogle = async() => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const userDoc = getUser(user.uid);
    if (userDoc.doc !== null) {
      const userInfo = {
        uid: user.uid,
        name: user.displayName,
        authProvider: "Google",
        email: user.email,
      }
      await addUser(userInfo);
    }
  } catch (err) {
    console.error(err);
  }
}

const authSignInWithEmailAndPassword = async(email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
}

const authCreateUserWithEmailAndPassword = async(email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const userInfo = {
      uid: user.uid,
      name: "",
      authProvider: "Email",
      email,
    }
    await addUser(userInfo);
  } catch (err) {
    console.error(err);
  }
}

const authSendPasswordResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset link sent!");
  } catch (err) {
    console.error(err);
  }
}

const authSignOut = async () => {
  await signOut(auth);
}

const authOnAuthStateChanged = auth.onAuthStateChanged;

export {
  authSignInWithGoogle,
  authSignInWithEmailAndPassword,
  authCreateUserWithEmailAndPassword,
  authSendPasswordResetEmail,
  authSignOut,
  authOnAuthStateChanged,
}