// framework react native
import React, { useMemo, useState } from "react";

// framework css react base
import {
  Body,
  Card,
  CardItem,
  Content,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
} from "native-base";

import {
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

// model typescript
import { MessageLiteModel } from "../../model/messageLite-model";

// call rest
import { ApiService } from "../../service/ApiService";

// personnal component
import Message from "./Message";

import { Feather } from "@expo/vector-icons";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import styles from "./messagesStyles.js";
import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";

interface MessageListProps {
  navigation: any;
}

const MessageList = ({ navigation }: MessageListProps) => {
  const apiService = useMemo(() => new ApiService(), []);
  const [messages, setMessages] = useState<MessageLiteModel[]>([]);
  const [nbeMessages, setNbeMessages] = useState<number>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [titleFilter, setTitleFilter] = useState<string>(
    "Message(s) non-lu(s)"
  );
  const [filter, setFilter] = useState<String>("unseen");

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      handleFilterMessages(filter);
      return () => {
        isActive = false;
      };
    }, [])
  );

  const onRefreshData = React.useCallback(() => {
    console.log("filter", filter);
    handleFilterMessages(filter);
  }, []);

  const handleFilterMessages = async (filter) => {
    setRefreshing(true);
    let formData;
    if (filter === "") {
      formData = { xaction: null };
    } else if (filter === "seen") {
      formData = { xaction: null, filter: "seen" };
    } else {
      formData = { xaction: null, filter: "unseen" };
    }
    apiService.login(formData).then((res) => {
      let arrayMessages = [];
      for (var items in res.data) {
        arrayMessages.push(res.data[items]);
      }
      if (filter === "") {
        formData = { xaction: null };
        setTitleFilter("Message(s)");
      } else if (filter === "seen") {
        formData = { xaction: null, filter: "seen" };
        setTitleFilter("Message(s) lu(s)");
      } else {
        formData = { xaction: null, filter: "unseen" };
        setTitleFilter("Message(s) non-lu(s)");
      }
      setMessages(arrayMessages);
      setNbeMessages(arrayMessages.length);
      setRefreshing(false);
    });
  };

  if (refreshing) {
    return <Spinner color='blue' />;
  }

  return (
    <View style={styles2.container}>
      <List>
        <ListItem>
          <Left>
            <Text>
              {nbeMessages} {titleFilter}
            </Text>
          </Left>
          <Right>
            <FilterComponent
              onFilterMessages={(filter) => {
                setFilter(filter);
                handleFilterMessages(filter);
              }}
            />
          </Right>
        </ListItem>
      </List>
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={styles2.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshData} />
        }
      >
        <List>
          {messages.map((message) => (
            <Message
              key={message.cle_x_action}
              message={message}
              navigation={navigation}
            />
          ))}
        </List>
      </ScrollView>
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
});

export default MessageList;

interface FilterComponentProps {
  onFilterMessages: (filter: string) => void;
}

export const FilterComponent = ({ onFilterMessages }: FilterComponentProps) => {
  return (
    <Menu>
      <MenuTrigger>
        <Feather
          name='more-vertical'
          size={24}
          style={styles.threeDotsVertical}
        />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => onFilterMessages("")}>
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
  );
};
