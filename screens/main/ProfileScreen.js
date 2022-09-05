import React from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { logOut } from "../../redux/auth/auth-operation";
// import icons
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const onlogOut = () => {
    dispatch(logOut());
  };
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={onlogOut}
        activeOpacity={0.7}
      >
        <Ionicons
          name="exit-outline"
          size={30}
          color="#63D471"
          style={styles.btnIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },

  btn: {
    position: "absolute",
    top: 15,
    left: 10,
    height: 60,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,

    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#63D471",
    borderRadius: 25,
  },

  btnTitle: {
    fontFamily: "Lora-Regular",
    color: "#63D471",
    fontSize: 18,
  },
  btnIcon: {
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
