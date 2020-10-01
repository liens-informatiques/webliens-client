import {
  Body,
  Right,
  Title,
  Text,
  Header,
  Left,
  Button,
  Icon,
} from "native-base";
import React, { useMemo } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";
import { TouchableHighlight } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ApiService } from "../../service/ApiService";

export interface HeaderComponentProps {
  navigation: any;
}

const HeaderComponent = ({ navigation }: HeaderComponentProps) => {
  const apiService = useMemo(() => new ApiService(), []);

  async function handleLogout() {
    await AsyncStorage.removeItem("token_auth");
    apiService
      .login({ logout: null })
      .then(async (res) => {
        navigation.navigate("Auth");
      })
      .catch((e) => {});
  }

  return (
    <Header>
      <Left>
        <Button onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MaterialCommunityIcons name='menu' size={24} color='white' />
        </Button>
      </Left>
      <Body>
        <Title>Webliens</Title>
      </Body>
      <Right>
        <Button onPress={() => handleLogout()}>
          <MaterialCommunityIcons name='logout' size={24} color='white' />
        </Button>
      </Right>
    </Header>
  );
};

export default HeaderComponent;
