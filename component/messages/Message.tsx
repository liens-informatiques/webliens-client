import React from "react";
import { ListItem, Body, Right, Text, Button } from "native-base";
import { MessageLiteModel } from "../../model/messageLite-model";
import styles from "./messagesStyles.js";
import { MessageState } from "../../enum/MessageState";

export interface MessageProps {
  message: MessageLiteModel;
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

const Message = ({ message, navigation }: MessageProps) => {
  const formatDate = getDate(message.date_fin);
  const time = getTime(message.date_fin);

  let colorStyle = null;
  if (message.etat === MessageState.UNSEEN) {
    colorStyle = styles.blueMessageNoSeen;
  }

  return (
    <ListItem
      avatar
      button
      onPress={() => {
        navigation.navigate("MessageDetails", {
          id: message.cle_x_action,
        });
      }}
    >
      <Text
        style={{
          backgroundColor: message.couleur,
          color: "white",
        }}
      >
        {message.type_libelle}
      </Text>
      <Body>
        <Text ellipsizeMode='tail' numberOfLines={1} style={colorStyle}>
          {message.titre}
        </Text>
        <Text note>{message.emetteur}</Text>
      </Body>
      <Right>
        <Text note>{formatDate}</Text>
        <Text note>{time}</Text>
      </Right>
    </ListItem>
  );
};

export default Message;
