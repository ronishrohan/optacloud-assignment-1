import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2UlJqKIxYMT-za95opiVOMfZXiB72GsI",
  authDomain: "optacloud-d9e91.firebaseapp.com",
  projectId: "optacloud-d9e91",
  storageBucket: "optacloud-d9e91.firebasestorage.app",
  messagingSenderId: "394249182183",
  appId: "1:394249182183:web:11047ff730c9ea9a14fb42",
  measurementId: "G-HV4BWZP43T"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);