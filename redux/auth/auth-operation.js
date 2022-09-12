import { createAsyncThunk } from "@reduxjs/toolkit";

import * as db from "../../helpers/firebase/auth";

//! REGISTER new user
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data, { rejectWithValue }) => {
    try {
      const { email, photoURL, uid, displayName } = await db.register(data);

      const user = { email, photoURL, uid, displayName };

      return user;
    } catch (error) {
      Alert.alert(
        "Помилка входу",
        "Щось пішло не так \n Перевірте дані та спробуйте ще раз",
        [
          {
            text: "OK",
            onPress: () => console.log("Ok pressed"),
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );
      return rejectWithValue(error);
    }
  }
);

//! LOGIN  user
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, { rejectWithValue }) => {
    try {
      const { email, photoURL, uid, displayName } = await db.logIn(data);
      //   Notify.success(
      //     " You will receive an email in a few minutes, please verify your email to continue."
      //   );
      const user = { email, photoURL, uid, displayName };
      return user;
    } catch (error) {
      Alert.alert(
        "Помилка входу",
        "Щось пішло не так \n Перевірте дані та спробуйте ще раз",
        [
          {
            text: "OK",
            onPress: () => console.log("Ok pressed"),
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );
      console.log(error.text);
      return rejectWithValue(error);
    }
  }
);

//! LOGOUT
export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const user = await db.logOut();

      return user;
    } catch (error) {
      // Notify.failure('Something went wrong, please try again later');

      return rejectWithValue(error);
    }
  }
);

// ! CURRENT
// export const current = createAsyncThunk(
//   "auth/current",
//   async (_, { rejectWithValue }) => {
//     try {
//       await onAuthStateChanged(auth, (user) => {
//         if (user) {
//           const { email, photoURL, uid, displayName } = user;

//           return (data = { email, photoURL, uid, displayName, isLogin: true });
//         } else {
//           return (data = { isLogin: false });
//         }
//       });
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );
