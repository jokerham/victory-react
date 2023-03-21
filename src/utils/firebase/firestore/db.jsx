import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { app } from '../app';

const db = getFirestore(app);

// disableNetwork(db)
//   .then(() => {
//     return enableNetwork(db);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

export { db }
