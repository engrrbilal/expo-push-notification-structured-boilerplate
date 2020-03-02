import React from "react";
import { Text, View, Button, Vibration, Platform } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import registerForPushNotificationsAsync from "./registerForPushNotification";
import sendPushNotification from "./SendPushNotification";

export default class NotificationContainer extends React.Component {
  state = {
    expoPushToken: "",
    notification: {}
  };

  componentDidMount() {
    const tokenResponse = registerForPushNotificationsAsync();
    tokenResponse.then(token => {
      console.log("#token returned : ", token);
      this.setState({ expoPushToken: token }, () => {
        this.setAndRegisterPushNotification(); //To send notification when this component render
      });
    });
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  componentWillUnmount() {
    console.log("componentWillUnmount: NotificationContainer");
    this._notificationSubscription
      ? this._notificationSubscription.remove()
      : "";
  }

  _handleNotification = notification => {
    // Vibration.vibrate();
    this.setState({ notification: notification });
  };

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications

  setAndRegisterPushNotification = async () => {
    message = this.props.message;
    const notificationBody = {
      to: message.token ? message.token : this.state.expoPushToken,
      sound: "default",
      title: message.title ? message.title : "Title of Notification",
      body: message.body ? message.body : "",
      data: message.data ? message.data : {},
      channelId: "reminders",
      priority: "high"
    };
    /* Another way of sending notification */
    // Notifications.presentLocalNotificationAsync({
    //   title: "Reminder",
    //   body: "This is an important reminder!!!!",
    //   android: {
    //     channelId: "reminders",
    //     color: "red"
    //   }
    // });

    // console.log("#notificationBody : ", notificationBody);
    const data = await sendPushNotification(notificationBody);
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>Origin: {this.state.notification.origin}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
        </View>
        <Button
          title={"Press to Send Notification"}
          onPress={() => this.setAndRegisterPushNotification()}
        />
      </View>
    );
  }
}

/*  TO GET PUSH RECEIPTS, RUN THE FOLLOWING COMMAND IN TERMINAL, WITH THE RECEIPTID SHOWN IN THE CONSOLE LOGS

    curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/getReceipts" -d '{
      "ids": ["YOUR RECEIPTID STRING HERE"]
      }'

    */
