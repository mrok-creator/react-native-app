import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
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

export const updateDocField = async (docId, data) => {
  const docFieldRef = doc(fbStore, "posts", docId);

  // Set the "capital" field of the city 'DC'
  await updateDoc(docFieldRef, {
    comments: arrayUnion(data),
  });
};

// import { doc, updateDoc } from "firebase/firestore";

// const washingtonRef = doc(db, "cities", "DC");

// // Atomically add a new region to the "regions" array field.
// await updateDoc(washingtonRef, {
//   comments: arrayUnion("greater_virginia"),
// });
