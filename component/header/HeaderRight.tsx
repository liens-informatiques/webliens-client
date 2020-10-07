import AsyncStorage from "@react-native-community/async-storage";
import { Content } from "native-base";
import React, { useMemo } from "react";
import { ApiService } from "../../service/ApiService";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface HeaderRightProps {
  navigation: any;
}

const HeaderRight = ({ navigation }: HeaderRightProps) => {
  const apiService = useMemo(() => new ApiService(), []);

  async function handleLogout() {
    await AsyncStorage.removeItem("token_auth");
    apiService
      .login({ logout: null })
      .then(async (res) => {
        navigation.navigate("Login");
      })
      .catch((e) => {});
  }

  return (
    <MaterialCommunityIcons
      name='logout'
      size={24}
      color='black'
      onPress={() => {
        handleLogout();
      }}
    />
  );
};

export default HeaderRight;
