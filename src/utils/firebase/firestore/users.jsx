import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from './db';

const usersRef = collection(db, 'Users');

function addUser(userInfo) {

}

async function getUserList(approved) {
  try {
    let users = [];
    const q = query(usersRef, where('approved', '==', approved), orderBy('name'));
    const s = await getDocs(q)
    s.forEach((doc) => {
      const user = doc.data();
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

export { 
  addUser,
  getUserList,
  getUserListByName,
  getUser,
}
