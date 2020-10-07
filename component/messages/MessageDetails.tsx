import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Card, CardItem, Body, Button } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { MessageModel } from "../../model/messageDetails-model";
import { ApiService } from "../../service/ApiService";
import styles from "./messagesStyles.js";

export interface MessageDetailsProps {
  navigation: any;
  route: any;
}

const MessageDetails = ({ navigation, route }: MessageDetailsProps) => {
  const apiService = useMemo(() => new ApiService(), []);
  const [message, setMessage] = useState<MessageModel>({
    cle_x_action: null,
    titre: "",
    emetteur: "",
    texte: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const MessageId = route.params.id;
      const formData = { cle_x_action: MessageId };

      const fetchmessage = async () => {
        try {
          const res = await apiService.login(formData);
          setMessage(res.data);
        } catch (e) {
          // nothing
        }
      };
      fetchmessage();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View>
      <Card>
        <CardItem header>
          <Text>{message.titre}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{message.texte}</Text>
            <Text note>{message.emetteur}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Button
            dark
            style={{ marginLeft: "8%" }}
            onPress={() => navigation.goBack()}
          >
            <Text>retour en arriere</Text>
          </Button>
          <Button success style={{ marginLeft: "8%" }}>
            <Text>Archiver</Text>
          </Button>
        </CardItem>
      </Card>
    </View>
  );
};

export default MessageDetails;
