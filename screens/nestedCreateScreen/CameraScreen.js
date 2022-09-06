import React, { useState, useEffect } from "react";
// import { useSelector, shallowEqual } from "react-redux";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";

import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import useUserId from "../../helpers/hooks/useUserId";
import uploadFile from "../../helpers/firebase/storage";

export default function CreateScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [coordinate, setCoords] = useState(null);

  const uid = useUserId();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCoords(location);
    })();
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const uploadPhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    const photo = await MediaLibrary.createAssetAsync(uri);
    // const latitude = location.coords.latitude;
    // const longitude = location.coords.longitude;

    //! do BLOB photo
    const img = await fetch(photo.uri);
    const file = await img.blob();

    // * upload photo to firebase storage
    // ? uploadFile = async (reference, name, file)
    const ref = "images/";
    const imgRef = await uploadFile(ref, uid, file);

    return imgRef;
  };

  const takePhoto = async () => {
    const coords = await {
      latitude: coordinate.coords.latitude,
      longitude: coordinate.coords.longitude,
    };

    const imgRef = await uploadPhoto();

    navigation.navigate("Create Post", {
      photo: imgRef,
      coords,
    });
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionBtn}
        >
          <Text style={styles.permissionBtnTitle}>Надати доступ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btn} onPress={toggleCameraType}>
            <MaterialCommunityIcons
              name="camera-flip-outline"
              size={35}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.btn,
              alignSelf: "flex-end",
              marginLeft: -50,
            }}
            onPress={takePhoto}
          >
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 15,
  },
  btn: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  permissionBtn: {
    height: 44,
    padding: 10,

    marginHorizontal: 50,
    alignItems: "center",

    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#63D471",
    borderRadius: 25,
  },

  permissionBtnTitle: {
    fontFamily: "Lora-Regular",
    color: "#fff",
    fontSize: 18,
  },

  title: {
    alignItems: "center",
    marginBottom: 33,
    marginTop: 33,
    color: "4E7D55",
  },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
