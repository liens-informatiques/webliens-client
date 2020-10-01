import { Content, Text } from "native-base";
import React from "react";
import HeaderComponent from "../header/HeaderComponent";

export interface AlertsListProps {
  navigation: any;
}

const AlertsList = ({ navigation }: AlertsListProps) => {
  return (
    <Content>
      <HeaderComponent navigation={navigation} />
      <Text>pour bientot....</Text>
    </Content>
  );
};

export default AlertsList;
