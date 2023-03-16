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
  addInstitute,
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
  addInstitute,
  getInstituteList,
}

// Reference
// - https://blog.logrocket.com/user-authentication-firebase-react-apps/