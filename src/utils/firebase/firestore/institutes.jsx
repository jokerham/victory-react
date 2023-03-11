import { getDocs, query, collection, orderBy } from 'firebase/firestore';
import { db } from './db';
import { getUser } from './users';

async function getInstituteList() {
  try {
    let InstituteList = [];
    const institutesRef = collection(db, 'Institutes');
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

export { getInstituteList }
