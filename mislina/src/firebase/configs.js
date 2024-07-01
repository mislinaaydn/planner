import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfgrl6HV2vwbyBa6ni4qoTtwA2Bg65PcQ",
  authDomain: "cherish-6c04a.firebaseapp.com",
  projectId: "cherish-6c04a",
  storageBucket: "cherish-6c04a.appspot.com",
  messagingSenderId: "564537553529",
  appId: "1:564537553529:web:b83df6dfa92c99f96d5aa8",
  measurementId: "G-0NMLXJN8LJ",
};
initializeApp(firebaseConfig);

const DB = getFirestore();
const auth = getAuth();

export { DB, auth };
