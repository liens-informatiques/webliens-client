import { Content } from "native-base";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import styles from "./sideBarStyle.js";

export default SideBar = (props) => (
  <ScrollView>
    <Content style={styles.content}>
      <Text style={styles.name}> Laurent Mercier </Text>
      <Text style={styles.menu}>Menu</Text>
      <View style={{ flex: 1 }}>
        <DrawerNavigatorItems {...props} />
      </View>
    </Content>
  </ScrollView>
);
