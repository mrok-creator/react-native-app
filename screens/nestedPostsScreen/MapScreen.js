import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 50.450001,
          longitude: 30.523333,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1,
        }}
        userInterfaceStyle={"dark"}
        showsUserLocation={true}
        userLocationAnnotationTitle={"Я тут))"}
        loadingEnabled={true}
      >
        {markers &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coords}
              title={marker.title}
              description={marker.description}
            />
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
