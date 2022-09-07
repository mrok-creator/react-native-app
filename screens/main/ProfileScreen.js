import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";

//*init firebase collection
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";

// import icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { firebaseConfig } from "../../helpers/firebase/config";
import { logOut } from "../../redux/auth/auth-operation";
import useUserId from "../../helpers/hooks/useUserId";
import useDisplayName from "../../helpers/hooks/useName";
import useAvatar from "../../helpers/hooks/useAvatar";

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const uid = useUserId();
  const nickName = useDisplayName();
  const avatar = useAvatar();

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const app = initializeApp(firebaseConfig);
    const fbStore = getFirestore(app);

    const q = await query(
      collection(fbStore, "posts"),
      where("owner", "==", uid)
    );

    setPosts([]);
    const unsubscribe = onSnapshot(q, (data) => {
      data.forEach((doc) => {
        setPosts((prevPost) => {
          const newComment = { ...doc.data(), id: doc.id };

          return [newComment, ...prevPost];
        });
      });
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const onlogOut = () => {
    dispatch(logOut());
  };

  const renderMarkUp = (post) => {
    const { id, photo, coords, title, locationTitle } = post;

    return (
      <View style={styles.item}>
        <Image style={styles.img} source={{ uri: photo }} />
        <View style={styles.btnWrapper}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            style={{
              ...styles.btn,
              position: "absolute",
              left: 20,
              bottom: 10,
            }}
            onPress={() => {
              navigation.navigate("Comments", { id, photo, uid, nickName });
            }}
            activeOpacity={0.7}
          >
            <FontAwesome5 name="comment" size={30} color="#63D471" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.btn, marginRight: 5, marginLeft: "auto" }}
            onPress={() => {
              navigation.navigate("Map", { coords, locationTitle });
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.locationText}>
              <FontAwesome5 name="map-marker-alt" size={30} color="#63D471" />
              {"  "} {locationTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bg-profile.jpg")}
        style={styles.imgBg}
        resizeMode={"cover"}
      >
        <View style={styles.InfoBox}>
          <View style={styles.personalInfo}>
            <Image
              style={styles.avatar}
              source={{ uri: avatar }}
              resizeMode={"cover"}
            />
            <Text style={styles.name}>{nickName}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.countedDigit}>{posts.length}</Text>
            <Text style={styles.textInfo}>
              {posts.length > 1 ? "Дописи" : "Допис"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.logOutBtn}
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
        <SafeAreaView style={styles.postList}>
          <FlatList
            data={posts}
            renderItem={({ item }) => renderMarkUp(item)}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  imgBg: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
  },

  // * Profile info styles
  InfoBox: {
    minHeight: 180,
    position: "relative",
    borderWidth: 1.5,
    borderColor: "#4E7D55",
    borderRadius: 10,
  },
  personalInfo: {
    flex: 1,
    width: 120,
    marginTop: 15,
    marginLeft: 15,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#63D471",
  },

  name: {
    textAlign: "center",
    fontFamily: "Lora-Regular",
    color: "#63D471",
    fontSize: 20,
  },

  // * Profile Indicator

  profileInfo: {
    position: "absolute",
    left: "50%",
    bottom: 35,
    maxWidth: "78%",
    minWidth: "35%",
    // height: 80,

    textAlign: "center",

    borderWidth: 2.2,
    borderColor: "#4E7D55",
    borderRadius: 40,
    padding: 10,
  },

  countedDigit: {
    textAlign: "center",
    fontFamily: "Lora-Bold",
    fontSize: 32,
    color: "#fff",
  },
  textInfo: {
    textAlign: "center",
    fontFamily: "Lora-Regular",
    fontSize: 20,
    color: "#fff",
  },

  // !PROFILE BTN

  logOutBtn: {
    position: "absolute",
    top: 65,
    right: 12,
    height: 50,
    width: 50,

    padding: 10,

    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#63D471",
    borderRadius: 25,
  },

  profileBtnTitle: {
    fontFamily: "Lora-Regular",
    color: "#63D471",
    fontSize: 18,
  },
  profBtnIcon: {
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  // * post styles

  postList: {
    flex: 1,
    height: "100%",
    backgroundColor: "transparent",
    paddingTop: 20,
  },

  item: {
    minWidth: 340,
    backgroundColor: "#4E7D55",

    marginHorizontal: 23,
    marginBottom: 20,
    marginTop: 10,

    borderRadius: 10,
  },
  img: {
    borderRadius: 10,
    height: 350,
    resizeMode: "cover",
  },

  btnWrapper: {
    position: "relative",
    justifyContent: "flex-start",
    height: 80,
  },

  btn: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginTop: 8,
    marginLeft: 25,
    fontFamily: "Lora-Medium",
    color: "#fff",
    fontSize: 20,
  },
  locationText: {
    fontFamily: "Lora-Regular",
    color: "#fff",
    fontSize: 16,
  },
});
