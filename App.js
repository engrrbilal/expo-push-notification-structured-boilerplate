import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import NotificationContainer from "./Notifications/NotificationContainer";
import { Notifications } from "expo";

export default class App extends Component {
  componentDidMount() {
    if (Platform.OS === "android") {
      /* Creating notification channel android 8+ specially for sound , user can alter it */
      Notifications.createChannelAndroidAsync("reminders", {
        name: "Reminders", //name of channel shown to user in notification-setting
        sound: true,
        priority: "max",
        badge: true,
        vibrate: [0, 250, 250, 250] // or true
      });
    }
  }
  render() {
    let notificationBody = {
      to: "",
      // sound: "default",
      title: "Title of Notification",
      body: "Body of Notification from App",
      data: { data: "other data of Notification from App" }
    };
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 30 }}>
          I'm Calling Notification From Home!
        </Text>
        <NotificationContainer message={notificationBody} />
        {/*Calling reuseable notification component*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
