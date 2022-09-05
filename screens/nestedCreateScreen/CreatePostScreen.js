import React, { useState } from "react";

import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
  Alert,
} from "react-native";

// import icons font
import { MaterialIcons } from "@expo/vector-icons";

import useId from "../../helpers/hooks/useUserId";

export default function CreatePostScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const uid = useId();

  const titleHandler = (text) => setTitle(text);

  const onSubmit = () => {
    //  ! do post logick
    console.log("Dorobu ce sYkiya");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsKeyboardShow(false);
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bg-create-post.jpg")}
          style={styles.imgBg}
          resizeMode={"cover"}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.item}>
              <ImageBackground
                style={styles.img}
                source={require("../../assets/images/bg-art.jpg")}
                //   ! need change img uri
              ></ImageBackground>
            </View>
            <View
              style={{
                ...styles.form,
                paddingBottom: isKeyboardShow ? 60 : 30,
              }}
            >
              <TextInput
                value={title}
                onChangeText={titleHandler}
                placeholder="Підпис"
                style={styles.input}
                keyboardAppearance={"dark"}
                placeholderTextColor={"#63D471"}
                onFocus={() => setIsKeyboardShow(true)}
              />
              <View style={styles.btnWrapper}>
                <TouchableOpacity
                  style={{ ...styles.btn, left: 100, bottom: 30, width: 250 }}
                  onPress={onSubmit}
                  activeOpacity={0.7}
                >
                  <Text style={styles.btnTitle}>Створити пост</Text>
                </TouchableOpacity>
                {/* <Link to="/profile">Реєструвався? заходь і насолоджуйся)</Link> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("Camera")}
                  style={{ ...styles.btn, left: 20, bottom: 30, width: 60 }}
                >
                  <MaterialIcons
                    name="monochrome-photos"
                    size={30}
                    color="#63D471"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,

    backgroundColor: "#0F4F49",
  },

  imgBg: {
    flex: 1,
    justifyContent: "flex-end",

    // resizeMode: "cover",
  },

  item: {
    backgroundColor: "#4E7D55",
    height: 320,
    marginBottom: 30,
    marginHorizontal: 16,

    borderWidth: 1,
    borderColor: "#63D471",
    borderRadius: 4,
  },
  img: {
    borderRadius: 10,
    flex: 1,
    resizeMode: "cover",
    backgroundPosition: "center",
  },

  form: {
    backgroundColor: "transparent",

    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  input: {
    fontFamily: "Lora-Regular",
    marginHorizontal: 16,
    fontSize: 18,

    height: 60,
    paddingLeft: 20,

    borderWidth: 1,
    borderColor: "#63D471",

    borderRadius: 15,
    color: "#fff",
    marginBottom: 50,
  },

  btnWrapper: {
    position: "relative",
    paddingBottom: 50,
  },

  btn: {
    position: "absolute",
    height: 44,
    alignItems: "center",
    justifyContent: "center",

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
});
