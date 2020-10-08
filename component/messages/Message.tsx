import React from "react";
import { ListItem, Body, Right, Text, Button } from "native-base";
import { MessageLiteModel } from "../../model/messageLite-model";
import styles from "./messagesStyles.js";
import { MessageState } from "../../enum/MessageState";

export interface MessageProps {
  item: MessageLiteModel;
  navigation: any;
}

function getDate(date) {
  let a = new Date(date * 1000);
  return a.getDate() + "/" + a.getMonth() + "/" + a.getFullYear() + " ";
}

function getTime(date) {
  let a = new Date(date * 1000);
  return a.getHours() + ":" + a.getMinutes();
}

const Message = ({ item, navigation }: MessageProps) => {
  const formatDate = getDate(item.date_fin);
  const time = getTime(item.date_fin);

  let colorStyle = null;
  if (item.etat === MessageState.UNSEEN) {
    colorStyle = styles.blueMessageNoSeen;
  }

  return (
    <ListItem
      avatar
      button
      onPress={() => {
        navigation.navigate("MessageDetails", {
          id: item.cle_x_action,
        });
      }}
    >
      <Text
        style={{
          backgroundColor: item.couleur,
          color: "white",
        }}
      >
        {item.type_libelle}
      </Text>
      <Body>
        <Text ellipsizeMode='tail' numberOfLines={1} style={colorStyle}>
          {item.titre}
        </Text>
        <Text note>{item.emetteur}</Text>
      </Body>
      <Right>
        <Text note>{formatDate}</Text>
        <Text note>{time}</Text>
      </Right>
    </ListItem>
  );
};

export default Message;
