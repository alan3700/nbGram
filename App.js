import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import CameraScreen from "./screens/CameraScreen";
import FeedScreen from "./screens/FeedScreen";
import ImagesScreen from "./screens/ImageScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import NbaTeam from "./screens/NbaTeam";



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName="";

            if (route.name === "Camera") {
              iconName = focused ? "camera" : "camera-outline";
            } else if (route.name === "Images") {
              iconName = focused ? "image" : "image-outline";
            } else if (route.name === "Feed") {
              iconName = focused ? "share-social" : "share-social-outline";
            }else if (route.name === "Nba") {
              iconName = focused ? "basketball" : "basketball-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: route.name === "Nba"?'#F86624':"blue",
          tabBarInactiveTintColor: "black",
        })}
      >
      <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen name="Images"  component={ImagesScreen} />
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Nba" component={NbaTeam} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
