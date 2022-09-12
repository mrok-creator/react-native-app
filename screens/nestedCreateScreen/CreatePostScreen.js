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

import { addToPostCollection } from "../../helpers/firebase/fireStore";
import useId from "../../helpers/hooks/useUserId";
import useName from "../../helpers/hooks/useName";

export default function CreatePostScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [locTitle, setLocTitle] = useState("");
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const uid = useId();
  const displayName = useName();
  const { photo, coords } = route.params;

  const titleHandler = (text) => setTitle(text);
  const locationHandler = (text) => setLocTitle(text);

  const uploadPost = async () => {
    const date = Date.now().toString();

    const post = {
      createdAt: date,
      owner: uid,
      ownerName: displayName,
      photo,
      coords,
      title,
      locationTitle: locTitle,
    };

    return (response = await addToPostCollection(post));
  };

  const onSubmit = async () => {
    if (title.trim().length === 0) {
      return Alert.alert(
        "Ви впевнені?",
        "Ви точно хочете залишити підпис порожнім?",
        [
          {
            text: "OK",
            onPress: async () => {
              await uploadPost();
              navigation.navigate("Feed");
              return;
            },
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );
    }

    await uploadPost();
    navigation.navigate("Feed");
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
          <View style={styles.item}>
            <ImageBackground
              style={styles.img}
              source={{ uri: photo }}
            ></ImageBackground>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                ...Platform.select({
                  ios: {
                    paddingBottom: isKeyboardShow ? 140 : 32,
                  },
                  android: {
                    paddingBottom: 32,
                  },
                }),
              }}
            >
              <TextInput
                value={title}
                onChangeText={titleHandler}
                placeholder="Підпис"
                style={styles.input}
                keyboardAppearance={"dark"}
                placeholderTextColor={"#63D471"}
                onFocus={() => {
                  if (isKeyboardShow) {
                    return;
                  }
                  setIsKeyboardShow(true);
                }}
              />
              <TextInput
                value={locTitle}
                onChangeText={locationHandler}
                placeholder="Локація"
                style={styles.input}
                keyboardAppearance={"dark"}
                placeholderTextColor={"#63D471"}
                onFocus={() => {
                  if (isKeyboardShow) {
                    return;
                  }
                  setIsKeyboardShow(true);
                }}
              />
              <View style={styles.btnWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Camera")}
                  style={{
                    ...styles.btn,
                    left: 20,

                    width: 60,
                  }}
                >
                  <TouchableOpacity
                    style={{ ...styles.btn, left: 85, width: 250 }}
                    onPress={onSubmit}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={{
                        ...styles.btnTitle,
                      }}
                    >
                      Створити пост
                    </Text>
                  </TouchableOpacity>

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
  },

  input: {
    fontFamily: "Lora-Bold",
    marginHorizontal: 16,
    fontSize: 22,

    height: 40,
    paddingLeft: 20,

    borderWidth: 1,
    borderColor: "#63D471",

    borderRadius: 15,
    color: "#00aa00",
    marginBottom: 20,
  },

  btnWrapper: {
    position: "relative",
    height: 50,
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
