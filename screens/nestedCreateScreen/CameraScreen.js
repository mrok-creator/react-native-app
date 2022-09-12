import React, { useState, useEffect } from "react";
// import { useSelector, shallowEqual } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Camera, CameraType } from "expo-camera";

import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import useUserId from "../../helpers/hooks/useUserId";
import uploadFile from "../../helpers/firebase/storage";

export default function CreateScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestCameraPermission] = Camera.useCameraPermissions();
  const [statusMedia, requestLibraryPermission] = MediaLibrary.usePermissions();
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

  if (!permission || !statusMedia) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted || !statusMedia.granted) {
    // Camera permissions are not granted yet
    return (
      <View
        style={{
          ...styles.permissionContainer,
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <ImageBackground
          source={require("../../assets/images/permission-bg.jpg")}
          style={styles.imgBgPermission}
          resizeMode={"cover"}
        >
          <Text style={styles.titlePermission}>
            Необхідний дозвіл для використання камери
          </Text>
          <TouchableOpacity
            onPress={() => {
              requestCameraPermission();
              requestLibraryPermission();
            }}
            style={styles.permissionBtn}
          >
            <Text style={styles.permissionBtnTitle}>Надати доступ</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const uploadPhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    await MediaLibrary.createAssetAsync(uri);
    // const latitude = location.coords.latitude;
    // const longitude = location.coords.longitude;

    //! do BLOB photo
    const img = await fetch(uri);
    const file = await img.blob();

    // * upload photo to firebase storage
    // ? uploadFile = async (reference, name, file)
    const ref = "images/";
    const imgRef = await uploadFile(ref, uid, file);

    return imgRef;
  };

  const takePhoto = async () => {
    const { coords } = await Location.getCurrentPositionAsync({ accuracy: 1 });

    const imgRef = await uploadPhoto();

    navigation.navigate("Create Post", {
      photo: imgRef,
      coords,
    });
  };

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

  //*permission styles
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
  },

  imgBgPermission: {
    position: "relative",
    flex: 1,
    justifyContent: "flex-end",
  },

  titlePermission: {
    marginBottom: 25,
    marginHorizontal: 30,
    padding: 10,
    textAlign: "center",
    alignItems: "center",

    fontFamily: "Lora-Medium",
    fontSize: 22,
    color: "#63D471",
    backgroundColor: "#0F4F49",

    // borderWidth: 3,
    // borderColor: "#63D471",
    // borderRadius: 25,
  },

  permissionBtn: {
    height: 44,
    marginHorizontal: 80,

    marginBottom: 25,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#0F4F49",
    borderWidth: 1,
    borderColor: "#63D471",
    borderRadius: 25,
  },

  permissionBtnTitle: {
    fontFamily: "Lora-Medium",
    color: "#63D471",
    fontSize: 20,
  },
});
