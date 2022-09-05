import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";

import objectId from "bson-objectid";

const app = initializeApp(firebaseConfig);

const uploadFile = async (reference, name, file) => {
  const storage = getStorage();
  const storageRef = ref(storage, reference + `${name}-${objectId()}`);

  // ! upload photo to firebase storage
  const data = await uploadBytes(storageRef, file);
  return data;
};

export default uploadFile;
