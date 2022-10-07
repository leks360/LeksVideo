
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAJfKrdNPczhTpwz_30d0NRP1P3aKC-K_k",
  authDomain: "videoshare-32806.firebaseapp.com",
  projectId: "videoshare-32806",
  storageBucket: "videoshare-32806.appspot.com",
  messagingSenderId: "421803011320",
  appId: "1:421803011320:web:6cf0e43434c43f0366df0d"
};


 const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const provider =new GoogleAuthProvider();
export default app;