import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";

import objectId from "bson-objectid";

const app = initializeApp(firebaseConfig);

const uploadFile = async (reference, name, file) => {
  const storage = getStorage();
  const storageRef = ref(storage, reference + `${name}-${objectId()}`);

  // ! upload photo to firebase storage
  await uploadBytes(storageRef, file);

  const imgRef = await getDownloadURL(storageRef);
  return imgRef;
};

export default uploadFile;
