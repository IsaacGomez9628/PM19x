import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import Home from "./screens/home";
import Profile from "./screens/profile";
import Settings from "./screens/settings";
import Detalles from "./screens/detalles_usuario";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detalles" component={Detalles} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detalles" component={Detalles} />
    </Stack.Navigator>
  );
}

function getTabBarVisibility(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "";

  if (routeName === "Detalles") {
    return { display: "none" };
  }

  return {
    paddingBottom: 5,
    height: 60,
  };
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeStack"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "HomeStack") {
              iconName = "home";
            } else if (route.name === "ProfileStack") {
              iconName = "person";
            } else if (route.name === "Settings") {
              iconName = "settings";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007BFF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={({ route }) => ({
            title: "Home",
            tabBarStyle: getTabBarVisibility(route),
          })}
        />

        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={({ route }) => ({
            title: "Profile",
            tabBarStyle: getTabBarVisibility(route),
          })}
        />

        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
