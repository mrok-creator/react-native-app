import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  // const [markers, setMarkers] = useState(null);
  const { locationTitle, coords } = route.params;
  // useEffect(() => {
  //   useState((prevMarkers) => ({ ...coords }));
  // }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.03,
        }}
        userInterfaceStyle={"dark"}
        showsUserLocation={true}
        userLocationAnnotationTitle={"You are here"}
        loadingEnabled={true}
      >
        <Marker coordinate={coords} title={locationTitle} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
