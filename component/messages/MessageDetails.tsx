import { View, Text, Card, CardItem, Body, Button } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { MessageModel } from "../../model/messageDetails-model";
import { ApiService } from "../../service/ApiService";
import HeaderComponent from "../header/HeaderComponent";

export interface MessageDetailsProps {
  navigation: any;
}

const MessageDetails = ({ navigation }: MessageDetailsProps) => {
  const MessageId = navigation.getParam("itemId", "NO-ID");
  const apiService = useMemo(() => new ApiService(), []);
  const [message, setMessage] = useState<MessageModel>({
    cle_x_action: null,
    titre: "",
    emetteur: "",
    texte: "",
  });

  useEffect(() => {
    const formData = { cle_x_action: MessageId };
    apiService.login(formData).then((res) => {
      console.log("res.data", res.data);
      setMessage(res.data);
    });
  }, [apiService]);

  console.log("message", message.texte);

  return (
    <View>
      <HeaderComponent navigation={navigation} />
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

//       formData = { cle_x_action: valeur };
