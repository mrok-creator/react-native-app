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

// import icons
import { FontAwesome5 } from "@expo/vector-icons";

export default function DefaultPostScreen({ route, navigation }) {
  // console.log("post params", route.params);

  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    if (!route.params) {
      return;
    }

    setPhoto((prevState) => [route.params, ...prevState]);
  }, [route.params]);

  //? return markup  for one post card
  const renderPostItem = ({ photo, coords }) => (
    <View style={styles.item}>
      <Image style={styles.img} source={{ uri: photo }} />
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={{ ...styles.btn, left: 0 }}
          onPress={() => {
            navigation.navigate("Map", { coords });
          }}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="#4E7D55" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.btn, left: 50 }}
          onPress={() => {
            navigation.navigate("Comments");
          }}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="comment" size={30} color="#4E7D55" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={photo}
          renderItem={({ item }) => renderPostItem(item)}
          keyExtractor={(item, index) => index.toString()}
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
  },

  btn: {
    padding: 15,

    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  item: {
    backgroundColor: "#4E7D55",

    marginVertical: 30,
    marginHorizontal: 16,

    borderRadius: 10,
  },
  title: {
    color: "#252d25",
    fontSize: 30,
  },
  img: {
    borderRadius: 10,
    height: 350,
    resizeMode: "cover",
  },
});
