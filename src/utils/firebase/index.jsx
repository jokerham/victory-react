import {
  authSignInWithGoogle,
  authSignInWithEmailAndPassword,
  authCreateUserWithEmailAndPassword,
  authSendPasswordResetEmail,
  authSignOut,
  authOnAuthStateChanged,
} from './authentication';
import {
  addUser,
  getUserList,
  getUserListByName,
  getUser,
  getInstituteList,
} from './firestore'

export {
  // Fireauth functions
  authSignInWithGoogle,
  authSignInWithEmailAndPassword,
  authCreateUserWithEmailAndPassword,
  authSendPasswordResetEmail,
  authSignOut,
  authOnAuthStateChanged,
  // Firestore functions
  addUser,
  getUserList,
  getUserListByName,
  getUser,
  getInstituteList,
}

// Reference
// - https://blog.logrocket.com/user-authentication-firebase-react-apps/