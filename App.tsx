import React, { useEffect, useMemo, useState } from "react";

// framework css native-base
import { Button, Spinner, Content, Text, Title } from "native-base";

import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// personal component

import MessageList from "./component/messages/MessageList";
import AlertsList from "./component/alert/AlertsList";

//menu burger

import { MenuProvider } from "react-native-popup-menu";
import Login from "./component/login/login";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";
import { ApiService } from "./service/ApiService";

import MessageDetails from "./component/messages/MessageDetails";
import HeaderLeft from "./component/header/HeaderLeft";
import HeaderRight from "./component/header/HeaderRight";
import Drawer from "./component/drawer/drawer";
import * as Font from "expo-font";

const Stack = createStackNavigator();

export default function App() {
  const [IsConnected, setIsconnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const apiService = useMemo(() => new ApiService(), []);

  useEffect(() => {
    // const loadFonts = async () => {
    //   Font.loadAsync({
    //     Roboto: require("native-base/Fonts/Roboto.ttf"),
    //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    //   });
    // };
    // loadFonts();

    AsyncStorage.getItem("token_auth")
      .then((res) => {
        console.log("token vaut", res);
        apiService.login({ token_auth: res }).then((response) => {
          console.log("connexion webliens", response.data);
          if (response.data.login) {
            setIsconnected(true);
            setIsLoading(false);
          }
        });
      })
      .catch((e) => {});
  }, [apiService]);

  if (isLoading) {
    return <Text>waiting...</Text>;
  }
  const InitialRoute = IsConnected ? "Messagerie" : "Login";
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={InitialRoute}
          screenOptions={{ headerShown: true }}
        >
          <Stack.Screen
            name='Messagerie'
            component={Drawer}
            options={({ navigation, route }) => ({
              title: "Webliens",
              headerLeft: () => (
                <HeaderLeft navigation={navigation} route={route} />
              ),
              headerRight: () => <HeaderRight navigation={navigation} />,
            })}
          />

          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='MessageDetails' component={MessageDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
