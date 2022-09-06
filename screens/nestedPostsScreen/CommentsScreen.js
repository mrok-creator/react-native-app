import React, { useState, useEffect } from "react";

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
  Text,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";

//*init firebase collection
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

// import icons
import { FontAwesome } from "@expo/vector-icons";

import { updateDocField } from "../../helpers/firebase/fireStore";
import { firebaseConfig } from "../../helpers/firebase/config";

export default function CommentsScreen({ route }) {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [comment, setComment] = useState("");

  const [commentsList, setCommentsList] = useState([]);

  const { id, photo, uid, nickName } = route.params;

  const commentHandler = (text) => setComment(text);

  const renderComments = async () => {
    const app = initializeApp(firebaseConfig);
    const fbStore = getFirestore(app);
    // todo
    const unsub = await onSnapshot(doc(fbStore, "posts", id), (doc) => {
      const arr = doc.data().comments;
      // if(!arr)
    });
  };

  useEffect(() => {
    renderComments();
  }, []);

  const sendComent = async () => {
    if (comment.trim().length !== 0) {
      const data = {
        authorName: nickName,
        authorId: uid,
        comment,
      };
      await updateDocField(id, data);
      setComment("");
    }
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
          source={require("../../assets/images/bg-comments.jpg")}
          style={styles.imgBg}
          resizeMode={"cover"}
        >
          <View style={styles.post}>
            <ImageBackground
              style={styles.postImg}
              source={{ uri: photo }}
            ></ImageBackground>
          </View>

          <SafeAreaView style={styles.commentsList}>
            <FlatList
              data={commentsList}
              renderItem={({ item }) => renderComments(item)}
              keyExtractor={(item, index) => index}
            />
          </SafeAreaView>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                ...Platform.select({
                  ios: {
                    paddingBottom: isKeyboardShow ? 120 : 0,
                  },
                }),
              }}
            >
              <View
                style={{ position: "relative", height: 60, marginBottom: 10 }}
              >
                <TextInput
                  value={comment}
                  onChangeText={commentHandler}
                  placeholder="Коментар"
                  style={styles.input}
                  keyboardAppearance={"dark"}
                  placeholderTextColor={"#63D471"}
                  onFocus={() => setIsKeyboardShow(true)}
                />

                <TouchableOpacity
                  style={{ ...styles.btn }}
                  onPress={sendComent}
                  activeOpacity={0.7}
                >
                  <FontAwesome name="send" size={24} color="#63D471" />
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
    flex: 1,

    backgroundColor: "#0F4F49",
  },

  imgBg: {
    position: "relative",

    flex: 1,
    justifyContent: "flex-end",

    // resizeMode: "cover",
  },
  // *post img
  post: {
    backgroundColor: "#4E7D55",
    height: 220,
    marginTop: 10,

    marginHorizontal: 12,

    borderWidth: 1,
    borderColor: "#63D471",
    borderRadius: 4,
  },
  postImg: {
    borderRadius: 10,
    flex: 1,
    resizeMode: "cover",
    backgroundPosition: "center",
  },

  // *comments List container
  commentsList: {
    flex: 1,
    height: "100%",
    backgroundColor: "transparent",
  },

  commentItem: {
    height: 60,
    marginBottom: 10,
    marginRight: "auto",
    marginLeft: 10,
    paddingLeft: 20,

    fontFamily: "Lora-Regular",
    fontSize: 18,
    color: "#fff",

    borderWidth: 1,
    borderColor: "#63D471",
    borderRadius: 15,
  },

  ownCommentItem: {
    height: 60,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: "auto",
    paddingLeft: 20,

    fontFamily: "Lora-Regular",
    fontSize: 18,
    color: "#fff",

    borderWidth: 1,
    borderColor: "#63D471",
    borderRadius: 15,
  },

  // *input Form
  form: {
    backgroundColor: "transparent",
  },

  input: {
    height: 60,
    marginBottom: 10,
    marginRight: 80,
    marginLeft: 10,
    paddingLeft: 20,

    fontFamily: "Lora-Medium",
    fontSize: 20,
    color: "#fff",

    borderWidth: 1.5,
    borderColor: "#63D471",
    borderRadius: 15,
  },

  btn: {
    position: "absolute",
    bottom: 0,
    right: 10,
    width: 50,
    height: 60,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#63D471",
    borderRadius: 25,
  },

  btnTitle: {
    fontFamily: "Lora-Regular",
    color: "#63D471",
    fontSize: 18,
  },
});
