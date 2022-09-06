import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { selectNavigation } from "../helpers/selectNavigation";

import useLogin from "../helpers/hooks/useIsLogin";
import { setUser, setStatus } from "../redux/auth/auth-slice";

const auth = getAuth();

const Main = () => {
  const dispatch = useDispatch();
  const isUserLogin = useLogin();

  useEffect(() => {
    const checkCurrentUser = async () => {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          const { email, photoURL, uid, displayName } = user;

          const data = { email, photoURL, uid, displayName, isLogin: true };

          dispatch(setUser(data));
        } else {
          dispatch(setStatus(false));
        }
      });
    };
    checkCurrentUser();
  }, []);

  const navigation = selectNavigation(isUserLogin);
  return <NavigationContainer>{navigation}</NavigationContainer>;
};

export default Main;
