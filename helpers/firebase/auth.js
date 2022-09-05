import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const register = async ({ nickName, email, password }) => {
  //signUp new user

  await createUserWithEmailAndPassword(auth, email, password);

  // update profile
  await updateProfile(auth.currentUser, {
    displayName: nickName,
    photoURL:
      "https://www.artmajeur.com/medias/hd/l/o/locutart/artwork/6954958_dressup247-anime-avatar.jpg",
  });

  // get updated data
  const data = await auth.currentUser;

  return data;
  //{displayName, uid} = data;
};

export const logIn = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  
  return user;
};

export const logOut = async () => {
  const data = await signOut(auth);
  return data;
};

//! current user
// export const currentUser = async () => {
//   const userInfo = await onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const { email, photoURL, uid, displayName } = user;

//       console.log("1--->", data);
//       data = { email, photoURL, uid, displayName, isLogin: true };
//       return data;
//     } else {
//       data = { isLogin: false };
//       console.log("2--->", data);
//       return data;
//     }
//   });
// };
