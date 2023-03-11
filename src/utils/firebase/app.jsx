import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCIQopeJk5B6MVHf5-xOKr7S9V2B-8pOVI",
  authDomain: "victory-compe.firebaseapp.com",
  projectId: "victory-compe",
  storageBucket: "victory-compe.appspot.com",
  messagingSenderId: "973012421426",
  appId: "1:973012421426:web:686e99ab937e829045e52b",
  measurementId: "G-WM7MPG09BM"
};

const app = initializeApp(firebaseConfig);

export { app }
