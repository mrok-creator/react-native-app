import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { selectNavigation } from "./helpers/selectNavigation";

export default function App() {
  const navigation = selectNavigation(true);
  return <NavigationContainer>{navigation}</NavigationContainer>;
}
