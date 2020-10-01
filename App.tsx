import React from "react";

// framework css native-base
import { Container } from "native-base";

// personal component

import MessageList from "./component/messages/MessageList";
import SideBar from "./component/SideBar/SideBar";
import AlertsList from "./component/alert/AlertsList";

//menu burger
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import CkeckAuth from "./component/ckeckAuth/CkeckAuth";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MenuProvider } from "react-native-popup-menu";
import Login from "./component/login/login";

const PrivateNavigator = createDrawerNavigator(
  {
    MessageList: {
      screen: MessageList,
      navigationOptions: {
        title: "Messagerie",
        drawerIcon: () => <AntDesign name='mail' size={24} color='black' />,
      },
    },
    AlertsList: {
      screen: AlertsList,
      navigationOptions: {
        title: "Alertes",
        drawerIcon: () => (
          <Feather name='alert-triangle' size={24} color='black' />
        ),
      },
    },
  },
  {
    contentComponent: (props) => <SideBar {...props} />,
  }
);

const Router = createAppContainer(
  createSwitchNavigator(
    {
      Starter: CkeckAuth,
      App: PrivateNavigator,
      Auth: Login,
    },
    {
      initialRouteName: "Starter",
      navigationOptions: {
        headerStyle: {
          backgroundColor: "blue",
          height: 80,
        },
      },
    }
  )
);

export default function App() {
  return (
    <MenuProvider>
      <Container>
        <Router />
      </Container>
    </MenuProvider>
  );
}
