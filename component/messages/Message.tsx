import React from "react";
import { ListItem, Body, Right, Text, Button } from "native-base";
import { MessageLiteModel } from "../../model/messageLite-model";
import { TouchableHighlight } from "react-native";

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

  return (
    <ListItem avatar>
      <Text
        style={{
          backgroundColor: message.couleur,
          color: "white",
        }}
      >
        {message.type_libelle}
      </Text>
      <Body>
        <Text ellipsizeMode='tail' numberOfLines={1}>
          {message.titre}
        </Text>
        <Text note>{message.emetteur}</Text>
      </Body>
      <Right>
        <Text note>{formatDate}</Text>
        <Text note>{time}</Text>
        <Button
          onPress={() => {
            navigation.navigate("MessageDetails", {
              itemId: message.cle_x_action,
              otherParam: "anything you want here",
            });
          }}
        >
          <Text>test</Text>
        </Button>
      </Right>
    </ListItem>
  );
};

export default Message;
