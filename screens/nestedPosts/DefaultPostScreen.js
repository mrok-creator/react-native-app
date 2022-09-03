import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// import icons
import { FontAwesome5 } from "@expo/vector-icons";

export default function DefaultPostScreen({ route, navigation }) {
  console.log(route.params);
  return (
    <View style={styles.container}>
      <Text>PostsScreen</Text>
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={{ ...styles.btn, left: 10 }}
          onPress={() => {
            navigation.navigate("Map");
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
});
