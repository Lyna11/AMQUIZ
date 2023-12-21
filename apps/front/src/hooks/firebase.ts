// import { FirebaseApp, initializeApp } from "firebase/app";
// import {
//   Auth,
//   initializeAuth,
//   getReactNativePersistence,
//   onAuthStateChanged,
// } from "firebase/auth";

// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import { Firestore, getFirestore } from "firebase/firestore";
// import { useContext, useEffect, useState } from "react";
// import { firebaseConfig } from "../config/firebase";

// const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {  
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

// const db = getFirestore(app);

// export const useFirebase = () => {
//   const [isInitialized, setIsInitialized] = useState(false);

//   useEffect(() => {
//     if (!auth) return;
//     onAuthStateChanged(auth, (user) => setIsInitialized(!!user));
//   }, []);

//   return {
//     app,
//     auth,
//     db,
//     currentUser: auth?.currentUser,
//     isInitialized,
//   };
// };

// export default useFirebase;


import { getAuth, initializeAuth, onAuthStateChanged, getReactNativePersistence, browserLocalPersistence } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseConfig } from "../config/firebase";
import { Platform } from 'react-native';
import axios from 'axios';

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {  
  persistence: Platform.OS === 'web' ? browserLocalPersistence : getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export const useFirebase = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!auth) {
      console.error("Erreur : auth non défini.");
      return;
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Utilisateur connecté :", user);

        user.getIdToken().then((idToken) => axios.defaults.headers.common['Authorization'] = idToken)
      } else {
        console.log("Aucun utilisateur connecté.");
      }
      setIsInitialized(true);
    }, (error) => {
      console.error("Erreur :", error);
      setIsInitialized(false);
    });
  }, [auth]);

  return {
    app,
    auth,
    db,
    currentUser: auth?.currentUser,
    isInitialized,
  };
};

export default useFirebase;
