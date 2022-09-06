import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";

import { signUp } from "../../redux/auth/auth-operation";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    "Lora-Regular": require("../../assets/font/Lora-Regular.ttf"),
    "Lora-Medium": require("../../assets/font/Lora-Medium.ttf"),
    "Lora-Bold": require("../../assets/font/Lora-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const nameHandler = (text) => setName(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    if (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0
    ) {
      const newData = {
        nickName: name,
        email,
        password,
      };

      dispatch(signUp(newData));

      setName("");
      setEmail("");
      setPassword("");

      setIsKeyboardShow(false);
      return;
    }
    Alert.alert(
      "Помилка реєстрації",
      ` Для майбутньої співпраці нам потрібна довіра - розкажи про себе більше. \n *Потрібно заповнити всі поля`,
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
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsKeyboardShow(false);
      }}
    >
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require("../../assets/images/bg-art.jpg")}
          style={styles.img}
          resizeMode={"cover"}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
              }}
            >
              <View style={styles.headerTitle}>
                <Text style={styles.headerText}>Реєстрація</Text>
              </View>
              <TextInput
                value={name}
                onChangeText={nameHandler}
                placeholder="Username"
                textContentType="nickname"
                style={styles.input}
                keyboardAppearance={"dark"}
                placeholderTextColor={"#4E7D55"}
                onFocus={() => setIsKeyboardShow(true)}
              />

              <TextInput
                value={email}
                placeholder="Email"
                textContentType="emailAddress"
                onChangeText={emailHandler}
                style={styles.input}
                keyboardAppearance={"dark"}
                placeholderTextColor={"#4E7D55"}
                onFocus={() => setIsKeyboardShow(true)}
              />

              <TextInput
                value={password}
                onChangeText={passwordHandler}
                placeholder="Password"
                textContentType="password"
                secureTextEntry={true}
                style={styles.input}
                keyboardAppearance={"dark"}
                placeholderTextColor={"#4E7D55"}
                onFocus={() => setIsKeyboardShow(true)}
              />

              {/* <Button title={"Login"} style={styles.btn} onPress={onLogin} /> */}
              <TouchableOpacity
                style={styles.btn}
                onPress={onLogin}
                activeOpacity={0.7}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              {/* <Link to="/profile">Реєструвався? заходь і насолоджуйся)</Link> */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{
                  marginTop: 12,
                  alignSelf: "center",
                }}
              >
                <Text style={{ color: "#fff", fontFamily: "Lora-Regular" }}>
                  Реєструвався раніше?
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#63D471",
                      fontFamily: "Lora-Bold",
                    }}
                  >
                    {"  "} Увійти
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#0F4F49",
  },

  img: {
    flex: 1,
    justifyContent: "flex-end",

    // resizeMode: "cover",
  },

  form: {
    backgroundColor: "#0F4F49",
    paddingBottom: 32,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  headerTitle: {
    alignItems: "center",
    marginBottom: 33,
    marginTop: 33,
  },
  headerText: {
    fontFamily: "Lora-Bold",
    color: "#fff",
    fontSize: 30,
  },

  input: {
    fontFamily: "Lora-Regular",
    marginHorizontal: 16,
    fontSize: 18,

    height: 45,
    paddingLeft: 20,

    borderWidth: 1,
    borderColor: "#63D471",

    borderRadius: 15,
    color: "#fff",
    marginBottom: 10,
  },

  btn: {
    height: 44,

    marginHorizontal: 50,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#63D471",
    borderRadius: 25,
  },

  btnTitle: {
    fontFamily: "Lora-Regular",
    color: "#fff",
    fontSize: 18,
  },
});
