import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  Card,
  CardItem,
  Body,
  Button,
  Footer,
  Container,
  Grid,
  Col,
  Content,
  Form,
  Textarea,
} from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { MessageModel } from "../../model/messageDetails-model";
import { ApiService } from "../../service/ApiService";
import styles from "./messagesStyles.js";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal, ScrollView, TouchableOpacity } from "react-native";

export interface MessageDetailsProps {
  navigation: any;
  route: any;
}

const MessageDetails = ({ navigation, route }: MessageDetailsProps) => {
  const [isVisible, SetIsVisible] = useState<boolean>(false);
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

  const ModalShow = isVisible ? (
    <ModalAnswer
      isVisible={isVisible}
      onCloseModal={() => SetIsVisible(false)}
      message={message}
    />
  ) : null;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ height: "80%" }}>
        <Card>
          <CardItem header>
            <Text>{message.titre}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{message.texte}</Text>
              <Text note>{message.emetteur} </Text>
            </Body>
          </CardItem>
          <CardItem></CardItem>
        </Card>
      </ScrollView>
      <Content
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: "5%",
        }}
      >
        <Grid>
          <Col>
            <MaterialCommunityIcons
              name='arrow-left'
              size={30}
              color='black'
              style={{ paddingLeft: "40%" }}
            />
          </Col>
          <Col>
            <MaterialCommunityIcons
              onPress={() => {
                console.log("press marche");
                SetIsVisible(true);
              }}
              name='message-reply-text'
              size={30}
              color='black'
              style={{ paddingLeft: "40%" }}
            />
          </Col>
          <Col>
            <MaterialCommunityIcons
              name='trash-can-outline'
              size={30}
              color='black'
              style={{ paddingLeft: "40%" }}
            />
          </Col>
        </Grid>
      </Content>
      {ModalShow}
    </View>
  );
};

export default MessageDetails;

const ModalAnswer = ({ isVisible, onCloseModal, message }) => {
  return (
    <Modal
      style={{ flex: 1, alignItems: "center" }}
      animationType={"slide"}
      transparent={false}
      visible={isVisible}
      onRequestClose={() => {
        onCloseModal();
      }}
    >
      <Text
        style={{
          alignItems: "center",
          fontSize: 24,
          fontStyle: "italic",
          marginLeft: "10%",
          marginTop: "10%",
        }}
      >
        {message.titre}
      </Text>
      <Form>
        <Textarea
          style={{ margin: "5%", marginTop: "5%" }}
          rowSpan={15}
          underline={true}
          bordered
          placeholder='votre message...'
        />
      </Form>
      <Content
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: "5%",
        }}
      >
        <Grid>
          <Col>
            <MaterialCommunityIcons
              name='cancel'
              size={40}
              color='red'
              style={{ paddingLeft: "40%" }}
            />
          </Col>
          <Col>
            <MaterialCommunityIcons
              name='check-circle-outline'
              size={40}
              color='green'
              style={{ paddingLeft: "40%" }}
            />
          </Col>
        </Grid>
      </Content>
    </Modal>
  );
};
