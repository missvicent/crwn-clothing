// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCOgNdeILWpLHgKMOcc9gLI9rS14gk68sU",
  authDomain: "crwn-db-ea07c.firebaseapp.com",
  projectId: "crwn-db-ea07c",
  storageBucket: "crwn-db-ea07c.appspot.com",
  messagingSenderId: "50944576668",
  appId: "1:50944576668:web:87a030a305f456c253f159",
  measurementId: "G-LVMFZZT9GM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const analytics = getAnalytics(app);

export const createUserProfileDocument = async (auth, additionalData) => {
  if (!auth) return;

  const userRef = doc(db, `users/${auth.uid}`);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists) {
    const { displayName, email } = auth;
    const createAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(error, userRef);
    }
  }
};

export const createWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const signInEmailAndPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider);
};

export const signOutGoogle = () => {
  signOut(auth);
};

