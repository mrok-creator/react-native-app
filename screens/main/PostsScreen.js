import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import DefaultPostScreen from "../nestedPosts/DefaultPostScreen";
import MapScreen from "../nestedPosts/MapScreen";
import CommentsScreen from "../nestedPosts/CommentsScreen";

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
