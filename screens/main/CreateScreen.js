import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "../nestedCreateScreen/CameraScreen";
import CreatePostScreen from "../nestedCreateScreen/CreatePostScreen";

const CreateStack = createStackNavigator();

export default function PostsScreen() {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <CreateStack.Screen
        name="Create Post"
        component={CreatePostScreen}
        options={{ headerShown: false }}
      />
    </CreateStack.Navigator>
  );
}
