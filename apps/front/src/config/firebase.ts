import {
  REACT_APP_FIREBASE_API_KEY,
  AUTHDOMAIN,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
} from "@env";

export const firebaseConfig = {
  // Votre configuration Firebase
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: "",
};
