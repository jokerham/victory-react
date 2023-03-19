import { addDoc, updateDoc, getDoc, getDocs, deleteDoc, doc, query, collection, orderBy } from 'firebase/firestore';
import { db } from './db';
import { getUser } from './users';

const institutesRef = collection(db, 'Institutes');

async function addInstitute(values) {
  try {
    if (existsInstitute(values.docId)) {
      const docId = values.docId;
      const docRef = doc(institutesRef, docId);
      delete values.docId;
      await updateDoc(docRef, values);
    } else {
      await addDoc(institutesRef, values);
    }
  } catch (error) {
    console.log(error);
  }
}

async function existsInstitute(docId) {
  try {
    const docRef = doc(institutesRef, docId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists();
  } catch (error) {
    console.log(error);
  }
}

async function getInstituteList() {
  try {
    let InstituteList = [];
    const institutesQuery = query(institutesRef, orderBy('title'));
    const snapshot = await getDocs(institutesQuery)

    for (const doc of snapshot.docs) {
      let institute = doc.data();
      institute.id = doc.id;
      if (institute.uid != null) {
        institute.user = await getUser(institute.uid)
      }
      InstituteList.push(institute);
    }
    return InstituteList;
  } catch (error) {
    console.log(error);
  }
}

async function deleteInstitute(docId) {
  try {
    const docRef = doc(institutesRef, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
}

export {
  addInstitute, 
  existsInstitute,
  getInstituteList,
  deleteInstitute
}
