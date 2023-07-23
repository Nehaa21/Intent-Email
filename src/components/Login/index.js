import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_API_KEY_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_API_KEY_PROJECTID,
  storageBucket: process.env.REACT_APP_API_KEY_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_API_KEY_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_API_KEY_APPID,
};

console.log(firebaseConfig, "config");

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;