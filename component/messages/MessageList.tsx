// framework react native
import React, { useEffect, useMemo, useState } from "react";

// framework css react base
import {
  Body,
  Card,
  CardItem,
  Content,
  Left,
  List,
  Spinner,
  Text,
  View,
} from "native-base";

// model typescript
import { MessageLiteModel } from "../../model/messageLite-model";

// call rest
import { ApiService } from "../../service/ApiService";

// personnal component
import Message from "./Message";

import HeaderComponent from "../header/HeaderComponent";

import { Feather } from "@expo/vector-icons";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import styles from "./messagesStyles.js";
import { ScrollView } from "react-navigation";

interface MessageListProps {
  navigation: any;
}

const MessageList = ({ navigation }: MessageListProps) => {
  const apiService = useMemo(() => new ApiService(), []);
  const [messages, setMessages] = useState<MessageLiteModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [titleFilter, setTitleFilter] = useState<string>("");

  useEffect(() => {
    const isFocused = navigation.isFocused();

    if (isFocused) {
      getMessages();
    }
    const navFocusListener = navigation.addListener("didFocus", () => {
      getMessages();
    });

    return () => {
      navFocusListener.remove();
    };
  }, []);

  function getMessages() {
    const formData = { xaction: null, filter: "unseen" };
    apiService.login(formData).then((res) => {
      let arrayMessages = [];
      for (var items in res.data) {
        arrayMessages.push(res.data[items]);
      }
      setTitleFilter("Messages non-lus");
      setMessages(arrayMessages);
      setIsLoading(false);
    });
  }

  function handleFilterMessages(filter) {
    let formData;
    if (filter === null) {
      formData = { xaction: null };
      setTitleFilter("Messages lus et non-lus");
    } else if (filter === "seen") {
      formData = { xaction: null, filter: "seen" };
      setTitleFilter("Messages lus");
    } else {
      formData = { xaction: null, filter: "unseen" };
      setTitleFilter("Messages non-lus");
    }
    apiService.login(formData).then((res) => {
      let arrayMessages = [];
      let compteur = 0;
      for (var items in res.data) {
        compteur++;
        arrayMessages.push(res.data[items]);
      }
      console.log("compteur", compteur);
      console.log("arrayMessages", arrayMessages.length);
      setMessages(arrayMessages);
    });
  }

  if (isLoading) {
    return <Spinner color='blue' />;
  }

  return (
    <Content>
      {/* <Card style={styles.card}>
        <CardItem header>
          <Body>
            <Text style={styles.cardTitle}>{titleFilter}</Text>
          </Body>
          <FilterComponent
            onFilterMessages={(filter) => handleFilterMessages(filter)}
          />
        </CardItem>
      </Card> */}
      <List>
        {messages.map((message) => (
          <Message
            key={message.cle_x_action}
            message={message}
            navigation={navigation}
          />
        ))}
      </List>
    </Content>
  );
};

interface FilterComponentProps {
  onFilterMessages: (filter: string) => void;
}

export const FilterComponent = ({ onFilterMessages }: FilterComponentProps) => {
  return (
    <View>
      <Left>
        <Menu>
          <MenuTrigger>
            <Feather
              name='more-vertical'
              size={24}
              style={styles.threeDotsVertical}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => onFilterMessages(null)}>
              <Text>Messages Tous</Text>
            </MenuOption>
            <MenuOption onSelect={() => onFilterMessages(`unseen`)}>
              <Text>Messages non-lus</Text>
            </MenuOption>
            <MenuOption onSelect={() => onFilterMessages(`seen`)}>
              <Text>Messages lus</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </Left>
    </View>
  );
};

export default MessageList;
