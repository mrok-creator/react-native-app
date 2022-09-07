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
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  doc,
  orderBy,
} from "firebase/firestore";

// import icons
import { FontAwesome } from "@expo/vector-icons";

import { addCommentsCollection } from "../../helpers/firebase/fireStore";
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

    const docId = id;
    const postsDocRef = doc(fbStore, "posts", docId);

    const q = await query(
      collection(postsDocRef, "comments"),
      orderBy("createdAt", "desc")
    );
    //! const q = query(collection(fbStore, "posts"), orderBy("createdAt", "desc"));
    setCommentsList([]);
    const unsubscribe = onSnapshot(q, (data) => {
      data.forEach((doc) => {
        setCommentsList((prevComment) => {
          const newComment = { ...doc.data(), id: doc.id };

          return [newComment, ...prevComment];
        });
      });
    });
  };

  useEffect(() => {
    renderComments();
  }, []);

  const sendComent = async () => {
    if (comment.trim().length !== 0) {
      const date = Date.now().toString();
      console.log("COMMENTSSCREEN ----date----> ", new Date(Date.now()));

      const data = {
        createdAt: date,
        authorName: nickName,
        authorId: uid,
        comment,
      };
      await addCommentsCollection(id, data);
      setComment("");
      setIsKeyboardShow(false);
    }
  };

  //? return markup  for one comment item
  const renderComment = (commentObj) => {
    const { authorId, authorName, comment } = commentObj;
    const isMineItem = uid === authorId;
    const commentStyle = isMineItem
      ? styles.ownCommentItem
      : styles.commentItem;
    const nameStyle = isMineItem ? styles.ownName : styles.name;
    return (
      <View style={commentStyle}>
        <Text style={nameStyle}>{authorName}</Text>
        <Text style={styles.commentText}> {comment}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bg-comments.jpg")}
        style={styles.imgBg}
        resizeMode={"cover"}
      >
        {/* <View style={styles.post}>
          <ImageBackground
            style={styles.postImg}
            source={{ uri: photo }}
          ></ImageBackground>
        </View> */}

        <SafeAreaView style={styles.commentsList}>
          <FlatList
            data={commentsList}
            renderItem={({ item }) => renderComment(item)}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.form,

              // paddingBottom: isKeyboardShow && Platform.OS == "ios" ? 120 : 0,

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
                onBlur={() => {
                  Keyboard.dismiss();
                  setIsKeyboardShow(false);
                }}
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
    marginTop: 8,
    marginBottom: 8,
    marginHorizontal: 10,

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
    paddingTop: 20,
  },

  commentItem: {
    minHeight: 60,
    minWidth: 140,
    marginBottom: 10,
    marginRight: "auto",
    marginLeft: 15,
    paddingLeft: 20,
    paddingRight: 15,

    borderWidth: 1,
    borderColor: "#63D471",
    borderRadius: 15,
  },

  ownCommentItem: {
    minHeight: 60,
    minWidth: 160,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: "auto",
    paddingHorizontal: 18,

    borderWidth: 1,
    borderColor: "#63D471",
    borderRadius: 20,
  },

  commentText: {
    marginVertical: 10,
    fontFamily: "Lora-Regular",
    fontSize: 18,
    color: "#fff",
  },

  name: {
    marginLeft: "auto",
    marginRight: 20,

    fontFamily: "Lora-Bold",
    fontSize: 22,
    color: "#fff",
    textDecorationLine: "underline",
    textDecorationColor: " #4E7D55",
  },

  ownName: {
    marginLeft: 20,
    marginRight: "auto",

    fontFamily: "Lora-Bold",
    fontSize: 22,
    color: "#63D471",
    textDecorationLine: "underline",
    textDecorationColor: " #4E7D55",
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
