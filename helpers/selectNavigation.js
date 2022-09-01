import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import PostsScreen from "../screens/main/PostsScreen";
import CreateScreen from "../screens/main/CreateScreen";
import ProfileScreen from "../screens/main/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

export const selectNavigation = (isLogin) => {
  if (!isLogin) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name="Register" component={SignUpScreen} />
        <AuthStack.Screen name="Login" component={SignInScreen} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTabs.Navigator

    //   tabBarOptions={{
    //     activeTintColor: "#63D471",
    //     inactiveTintColor: "#4E7D55",
    //   }}
    >
      <MainTabs.Screen name="Posts" component={PostsScreen} />
      <MainTabs.Screen name="New Post" component={CreateScreen} />
      <MainTabs.Screen name="Profile" component={ProfileScreen} />
    </MainTabs.Navigator>
  );
};
