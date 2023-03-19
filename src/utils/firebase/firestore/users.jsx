import { addDoc, updateDoc, getDoc, getDocs, deleteDoc, doc, query, collection, where, orderBy } from 'firebase/firestore';
import { db } from './db';

const usersRef = collection(db, 'Users');

async function addUser(values) {
  try {
    if (existsUser(values.docId)) {
      const docId = values.docId;
      const docRef = doc(usersRef, docId);
      delete values.docId;
      await updateDoc(docRef, values);
    } else {
      await addDoc(usersRef, values);
    }
  } catch (error) {
    console.log(error);
  }
}

async function existsUser(docId) {
  try {
    const docRef = doc(usersRef, docId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists();
  } catch (error) {
    console.log(error);
  }
}

async function getUserList(approved) {
  try {
    let users = [];
    const q = query(usersRef, where('approved', '==', approved), orderBy('name'));
    const s = await getDocs(q)
    s.forEach((doc) => {
      const user = doc.data();
      user.id = doc.id;
      users.push(user);
    });
    return users;
  } catch (error) {
    console.log(error);
  }
}

async function getUserListByName(name) {
  try {
    let users = [];
    const q = query(usersRef, orderBy('name'));
    const s = await getDocs(q)
    s.forEach((doc) => {
      const user = doc.data();
      if (user.name.includes(name)) {
        users.push(user);
      }
    });
    return users;
  } catch (error) {
    console.log(error);
  }
}

async function getUser(uid) {
  try {
    const q = query(usersRef, where('uid', '==', uid));
    const s = await getDocs(q);
    if (s.docs.length > 0) {
      return s.docs[0].data();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}
async function deleteUser(docId) {
  try {
    const docRef = doc(usersRef, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
}

export { 
  addUser,
  existsUser,
  getUserList,
  getUserListByName,
  getUser,
  deleteUser,
}
