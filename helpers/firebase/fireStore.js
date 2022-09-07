import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";

import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
const fbStore = getFirestore(app);

export const addToPostCollection = async (collectionData) => {
  try {
    const docRef = await addDoc(collection(fbStore, "posts"), collectionData);

    console.log("response from Firestore --->", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addCommentsCollection = async (docId, data) => {
  try {
    const postsDocRef = doc(fbStore, "posts", docId);
    // const docRef = await addDoc(collection(doc(fbStore, "posts", docId)), data);
    const ref = await addDoc(collection(postsDocRef, "comments"), data);
    // setDoc(doc(db, "cities", "LA")
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
