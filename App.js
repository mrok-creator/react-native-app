// const doSmth = (e) => {
//   e.preventDefault();
//   console.log(e.target.value);
//   Alert.alert("Mister", `Are you sure, that '${text}' is correct?`, [
//     {
//       text: "OK",
//       onPress: () => console.log("Ok pressed"),
//     },
//     {
//       text: "Cancel",
//       onPress: () => console.log("Cancel Pressed"),
//       style: "cancel",
//     },
//   ]);
// };

// <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//   <View style={styles.container}>
//     <KeyboardAvoidingView
//       behavior={Platform.OS == "ios" ? "padding" : "height"}
//     >
//       <TextInput
//         placeholder="Type text"
//         value={value}
//         onChangeText={inputHandler}
//         onSubmitEditing={doSmth}
//         style={{
//           width: 100,
//           borderWidth: 2,
//           borderColor: "pink",
//           borderRadius: 30,
//           marginBottom: 20,
//           paddingLeft: 10,
//         }}
//       />
//     </KeyboardAvoidingView>
//   </View>
// </TouchableWithoutFeedback>

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
} from "react-native";

export default function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    if (name.trim() > 0 && password.trim() > 0) {
      Alert.alert("Credentials", `${name} + ${password}`);
    } else {
      Alert.alert(
        "Login Failure",
        "You need to input your username and password to login",
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
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            value={name}
            onChangeText={nameHandler}
            placeholder="Username"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={passwordHandler}
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
          />
          <Button title={"Login"} style={styles.btn} onPress={onLogin} />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        backgroundColor: "#000000",
      },
      android: {
        backgroundColor: "#ffffff",
      },
    }),
  },

  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "blue",
    marginBottom: 10,
    borderRadius: 25,
    ...Platform.select({
      ios: {
        placeholderTextColor: "white",
        color: "darkblue",
        keyboardAppearance: "default",
      },
      android: {
        placeholderTextColor: "black",
        // placeholderTextColor: "white",
        color: "black",
      },
    }),
  },
  btn: {
    width: 200,
    height: 44,
    padding: 10,
    marginBottom: 10,

    backgroundColor: "transparent",

    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 25,

    ...Platform.select({
      ios: {
        color: "darkblue",
      },
      android: {
        color: "black",
      },
    }),
  },
});
