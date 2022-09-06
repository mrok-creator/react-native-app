import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";

//*init firebase collection
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";

// import icons
import { FontAwesome5 } from "@expo/vector-icons";

import { firebaseConfig } from "../../helpers/firebase/config";
import useUserId from "../../helpers/hooks/useUserId";

export default function DefaultPostScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const uid = useUserId();

  const subscribeForUpdate = async () => {
    const app = initializeApp(firebaseConfig);
    const fbStore = getFirestore(app);

    const q = query(collection(fbStore, "posts"));
    const unsubscribe = onSnapshot(q, (data) => {
      data.forEach((doc) => {
        setPosts((prevPosts) => {
          const newPost = { ...doc.data(), id: doc.id };
          return [...prevPosts, newPost];
        });
      });
    });
  };

  useEffect(() => {
    subscribeForUpdate();
  }, []);

  //? return markup  for one post card
  const renderPostItem = (post) => {
    const { owner, photo, coords, title, locationTitle } = post;
    const stl = uid !== owner ? styles.item : styles.myItem;
    return (
      <View style={stl}>
        <Image style={styles.img} source={{ uri: photo }} />
        <View style={styles.btnWrapper}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            style={{ ...styles.btn, left: 20, bottom: 10 }}
            onPress={() => {
              navigation.navigate("Comments");
            }}
            activeOpacity={0.7}
          >
            <FontAwesome5 name="comment" size={30} color="#63D471" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.btn, left: 120, bottom: 10 }}
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

  // todo  const { id, owner, photo, coords, title, locationTitle } = post;
  //! posts;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          renderItem={({ item }) => renderPostItem(item)}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0, //! test that
  },

  btnWrapper: {
    position: "relative",
    justifyContent: "flex-start",
    height: 80,
  },

  btn: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  myItem: {
    width: 340,
    backgroundColor: "#0F4F49",
    marginRight: 10,
    marginLeft: "auto",
    marginBottom: 25,

    borderRadius: 10,
  },

  item: {
    width: 340,
    backgroundColor: "#4E7D55",

    marginRight: "auto",
    marginLeft: 10,
    marginBottom: 25,

    borderRadius: 10,
  },
  title: {
    marginTop: 8,
    marginLeft: 25,
    fontFamily: "Lora-Medium",
    color: "#fff",
    fontSize: 20,
  },
  img: {
    borderRadius: 10,
    height: 350,
    resizeMode: "cover",
  },
  locationText: {
    fontFamily: "Lora-Regular",
    color: "#fff",
    fontSize: 16,
  },
});
