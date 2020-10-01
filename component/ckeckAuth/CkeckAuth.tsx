import React from "react";
import { ActivityIndicator, AsyncStorage, StyleSheet } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
interface CkeckAuthProps {
  navigation: any;
}

interface CheckAuthState {
  isLoading: boolean;
}

import { Root } from "native-base";
import { ApiService } from "./../../service/ApiService";

export default class CkeckAuth extends React.Component<
  CkeckAuthProps,
  CheckAuthState
> {
  state = { isLoading: true };
  apiService = new ApiService();

  componentDidMount = async () => {
    this._checkAuth();
  };

  _checkAuth = async () => {
    try {
      const token_auth = await AsyncStorage.getItem("token_auth");
      this.apiService
        .login({ token_auth: token_auth })
        .then((_res) => {
          this.props.navigation.navigate("App");
        })
        .catch((e) => {
          this.props.navigation.navigate("Auth");
        });
    } catch (e) {}
  };

  UNSAFE_componentWillMount = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });

    this.setState({ isLoading: false });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <Root>
        <ActivityIndicator />
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
