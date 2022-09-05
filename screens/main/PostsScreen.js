import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import DefaultPostScreen from "../nestedPostsScreen/DefaultPostScreen";
import MapScreen from "../nestedPostsScreen/MapScreen";
import CommentsScreen from "../nestedPostsScreen/CommentsScreen";

const PostsStack = createStackNavigator();

export default function PostsScreen() {
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen name="Feed" component={DefaultPostScreen} />
      <PostsStack.Screen name="Comments" component={CommentsScreen} />
      <PostsStack.Screen name="Map" component={MapScreen} />
    </PostsStack.Navigator>
  );
}
