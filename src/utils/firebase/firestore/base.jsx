import { addDoc, updateDoc, getDoc, getDocs, deleteDoc, doc, query, collection, where, orderBy } from 'firebase/firestore';
import { db } from './db';

export default class FirebaseBaseClass {
  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
  }

  async add(values) {
    try {
      await addDoc(this.collectionRef, values);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, values) {
    try {
      if (await this.exists(id)) {
        const decRef = doc(this.collectionRef, id);
        await updateDoc(decRef, values);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async exists(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      const snapshot = await getDoc(docRef);
      return snapshot.exists();
    } catch (error) {
      console.log(error);
    }
  }

  async select(whereConditions, orderConditions) {
    try {
      let records = [];
      let queryRef = query(this.collectionRef);
      whereConditions.forEach(whereCondition => {
        let condition = whereCondition.hasOwnProperty('condition') ? 
          whereCondition.condition : '==';
        queryRef = query(queryRef,
          where(whereCondition.expression, condition, whereCondition.value));
      });
      orderConditions.forEach(orderCondition => {
        let direction = orderCondition.hasOwnProperty('direction') ? 
          orderCondition.direction : "asc";
        queryRef = query(queryRef,
          orderBy(orderCondition.field, direction));
      });
      let snapshot = await getDocs(queryRef);
      for (const doc of snapshot.docs) {
        const record = doc.data();
        record.id = doc.id;
        records.push(record);
      }
      return records;
    } catch (error) {
      console.log(error);
    }
  }

  async selectById(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      const snapshot = await getDoc(docRef);
      const record = snapshot.data();
      record.id = id;
      return record;
    } catch (error) {
      console.log(error);
    }
  }
  
  async delete(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  }
}
