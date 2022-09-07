import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// import icons

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import PostsScreen from "../screens/main/PostsScreen";
import CreateScreen from "../screens/main/CreateScreen";
import ProfileScreen from "../screens/main/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTabs = createMaterialBottomTabNavigator();

export const selectNavigation = (isLogin) => {
  if (!isLogin) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Register"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTabs.Navigator
      labeled={false}
      activeColor={"#63D471"}
      inactiveTintColor={"#4E7D55"}
      barStyle={{
        backgroundColor: "#0F4F49",
        paddingBottom: 10,
      }}
    >
      {/* POSTS SCREEN */}
      <MainTabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="API"
              size={32}
              color={!focused ? "#fff" : "#63D471"}
              style={{
                width: 46,
                height: 46,

                textAlign: "center",
              }}
            />
          ),
        }}
      />

      {/* CREATE POST SCREEN */}
      <MainTabs.Screen
        name="New Post"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo
              name="squared-plus"
              size={38}
              color={!focused ? "#fff" : "#63D471"}
              style={{
                width: 46,
                height: 46,
                textAlign: "center",
              }}
            />
          ),
        }}
        style={{}}
      />

      {/* PROFILE SCREEN */}
      <MainTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={30}
              color={!focused ? "#fff" : "#63D471"}
              style={{
                width: 46,
                height: 46,
                marginTop: 0,
                textAlign: "center",
              }}
            />
          ),
        }}
      />
    </MainTabs.Navigator>
  );
};
