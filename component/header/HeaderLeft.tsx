import { View } from "native-base";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";

export interface HeaderLeftProps {
  navigation: any;
  route: any;
}

const HeaderLeft = ({ navigation, route }: HeaderLeftProps) => {
  return (
    <MaterialIcons
      name='menu'
      size={24}
      color='black'
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}
    />
  );
};

export default HeaderLeft;
