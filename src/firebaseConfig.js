// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAfNB_zl0vAjh1oyDa_hyNI3tIEYSgcZgc",
  authDomain: "crossroadsmenu-4ae0b.firebaseapp.com",
  databaseURL: "https://crossroadsmenu-4ae0b-default-rtdb.firebaseio.com",
  projectId: "crossroadsmenu-4ae0b",
  storageBucket: "crossroadsmenu-4ae0b.firebasestorage.app",
  messagingSenderId: "348121090060",
  appId: "1:348121090060:web:cbe795b8b26d9d7990c629",
  measurementId: "G-4SSFPEYN2G"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
