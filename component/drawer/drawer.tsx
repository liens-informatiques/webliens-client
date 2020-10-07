import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import React from "react";
import AlertsList from "../alert/AlertsList";
import MessageList from "../messages/MessageList";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "native-base";

export interface DrawerProps {}

const DrawerComponent = createDrawerNavigator();

const Drawer = ({}: DrawerProps) => {
  return (
    <DrawerComponent.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerComponent.Screen name='MessageList' component={MessageList} />
      <DrawerComponent.Screen name='AlertsList' component={AlertsList} />
    </DrawerComponent.Navigator>
  );
};

export default Drawer;

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Text> Menu : </Text>
      <DrawerItem
        icon={({ focused, color, size }) => (
          <AntDesign name='mail' size={20} color={color} />
        )}
        label='Messagerie'
        onPress={() => props.navigation.navigate("MessageList")}
      />
      <DrawerItem
        icon={({ focused, color, size }) => (
          <AntDesign name='warning' size={20} color={color} />
        )}
        label='Alertes'
        onPress={() => props.navigation.navigate("AlertsList")}
      />
    </DrawerContentScrollView>
  );
};
