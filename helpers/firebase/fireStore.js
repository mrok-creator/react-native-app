import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);

const fbStore = getFirestore(app);

export const addToCollection = async (collectionName, collectionData) => {
  try {
    const docRef = await addDoc(
      collection(fbStore, collectionName),
      collectionData
    );

    console.log("Document written with ID: ", docRef.id);
    console.log("response from Firestore --->", docRef);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
