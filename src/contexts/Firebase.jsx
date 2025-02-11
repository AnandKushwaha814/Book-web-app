/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"


const FirebaseContext = createContext(null);



const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "bookify-b25a4.firebaseapp.com",
  projectId: "bookify-b25a4",
  storageBucket: "bookify-b25a4.firebasestorage.app",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "1:650540838686:web:5e39e912df1fc3fdcea30f"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp);
const googleProvide = new GoogleAuthProvider();


export const FirebaseProvider = (props) => {

  // user Logged in or not
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, user => {
      if (user) setUser(user);
      else setUser(null)

    })
  }, [])
  const signUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password)

  // For Login
  const signinUser = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);

  //  Login With Google
  const loginWithGoogle = () => signInWithPopup(firebaseAuth, googleProvide)
  const isLoggedIn = user ? true : false;

  return <FirebaseContext.Provider value={{ signUserWithEmailAndPassword, signinUser, loginWithGoogle, isLoggedIn }}>{props.children}</FirebaseContext.Provider>
}
