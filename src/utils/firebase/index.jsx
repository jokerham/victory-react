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
  existsUser,
  getUserList,
  getUserListByName,
  getUser,
  deleteUser,
  addInstitute,
  existsInstitute,
  getInstituteList,
  deleteInstitute,
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
  existsUser,
  getUserList,
  getUserListByName,
  getUser,
  deleteUser,
  addInstitute,
  existsInstitute,
  getInstituteList,
  deleteInstitute,
}

// Reference
// - https://blog.logrocket.com/user-authentication-firebase-react-apps/