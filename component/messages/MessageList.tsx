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
  FlatList,
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
import { MessageState } from "../../enum/MessageState";
import { MessageFilter } from "../../enum/MessageFilter";

interface MessageListProps {
  navigation: any;
}

const MessageList = ({ navigation }: MessageListProps) => {
  const apiService = useMemo(() => new ApiService(), []);
  const [messages, setMessages] = useState<MessageLiteModel[]>([]);
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
    handleFilterMessages(filter);
  }, []);

  const handleFilterMessages = async (filter) => {
    setRefreshing(true);
    let formData;
    let title: string;
    if (filter === MessageFilter.ALL) {
      formData = { xaction: null, pageSize: 600, page: 1 };
      title = " Message(s)";
    } else if (filter === MessageFilter.SEEN) {
      formData = { xaction: null, filter: "seen", pageSize: 600, page: 1 };
      title = " Message(s) lu(s)";
    } else {
      formData = { xaction: null, filter: "unseen", pageSize: 600, page: 1 };
      title = " Message(s) non-lu(s)";
    }
    apiService.login(formData).then((res) => {
      setTitleFilter(res.data.count + title);
      setMessages(res.data.messages);
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
            <Text>{titleFilter}</Text>
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
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshData} />
        }
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={styles2.scrollView}
        data={messages}
        renderItem={({ item }) => (
          <Message item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.cle_x_action.toString()}
      />
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
        <MenuOption onSelect={() => onFilterMessages(MessageFilter.ALL)}>
          <Text>Messages Tous</Text>
        </MenuOption>
        <MenuOption onSelect={() => onFilterMessages(MessageFilter.UNSEEN)}>
          <Text>Messages non-lus</Text>
        </MenuOption>
        <MenuOption onSelect={() => onFilterMessages(MessageFilter.SEEN)}>
          <Text>Messages lus</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};
