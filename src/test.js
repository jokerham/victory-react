import { getStorage , ref } from "firebase/storage";

const storage = getStorage();

const mountainsRef = ref(storage, 'mountains.jpg');

const mountainImagesRef = ref(storage, 'images/mountains.jpg');

mountainsRef.name === mountainImagesRef.name;           // true
mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 
