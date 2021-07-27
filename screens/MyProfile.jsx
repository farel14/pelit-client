import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  Pressable,
  Text,
  Platform,
  Button
} from "react-native";
import { dateFormatter } from "../helpers/dateFormatter.js";
import SpendSummary from "../components/spendSummary";
import EarnedBadges from "../components/EarnedBadges";
import ModalBadge from "../components/AllBadges";
import NumberFormat from "react-number-format";

// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

const Separator = () => <View style={styles.separator} />;

export default function MyProfile({
  navigation,
  route,
  user,
  earnedBadges,
  allBadges,
  activeTarget,
}) {
  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();
  const today = dateFormatter(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  // async function sendPushNotification(expoPushToken) {
  //   const message = {
  //     to: expoPushToken,
  //     sound: 'default',
  //     title: 'Original Title',
  //     body: 'And here is the body!',
  //     data: { someData: 'goes here' },
  //   };
  
  //   await fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-encoding': 'gzip, deflate',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(message),
  //   });
  // }

  // async function registerForPushNotificationsAsync() {
  //   let token;
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }
  
  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }
  
  //   return token;
  // }

  // console.log(`"${expoPushToken}"`, 'PUSH TOKEN')
  // console.log(typeof expoPushToken)

  return (
    <ScrollView contentContainerStyle={styles.pageScrollContainer}>
      <View style={styles.pageViewContainer}>
        <View style={styles.pageTitle}>
          <View style={styles.userName}>
            <Text style={styles.pageTitleName}>Hi {user.firstName}!</Text>

          </View>
          <View style={styles.date}>
            <Text style={styles.pageTitleDate}>{today}</Text>
          </View>
        </View>

        <View style={styles.userDetails}>
          <Image
            style={styles.userProfilePicture}
            resizeMode="cover"
            borderRadius={50}
            source={{ uri: `${user.photoProfile}` }}
          />
          <View style={styles.userDetailTexts}>
            <Text style={styles.userName}>{user.fullName}</Text>
            <Text style={styles.userBalance}>
              Balance:{" "}
              <NumberFormat
                value={user.balance}
                decimalScale={0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
                renderText={(formattedValue) => (
                  <Text style={styles.userBalanceText}>{formattedValue}</Text>
                )}
              />
            </Text>
            <View style={{ marginTop: 15 }} />
            <Separator />
            <View style={{ marginTop: 15 }} />
            <View style={styles.userBadge}>
              <Text style={styles.userBadgeTitle}>My Badges</Text>
              <View style={{ flexDirection: "row" }}>
                {earnedBadges.map((badge, indexRow) => (
                  <EarnedBadges key={indexRow} badge={badge} />
                ))}
              </View>
              <Pressable
                style={styles.seeBadges}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.seeBadgesText}>See All Badges</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 30 }} />
        <Separator />

        {user.Transactions ? 
         <SpendSummary allSpending={user.Transactions} activeTarget={activeTarget} user={user}/>
         :
        null
        }

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ModalBadge allBadges={allBadges} earnedBadges={earnedBadges} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 500,
    width: 500,
  },
  separator: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pageScrollContainer: {
    flexGrow: 1,
  },
  pageViewContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#04009A",
  },
  pageTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
  },
  pageTitleName: {
    color: "white",
    fontSize: 18,
    marginTop: 15,
    fontWeight: "bold",
  },
  pageTitleDate: {
    color: "white",
    fontSize: 18,
    marginTop: 15,
    fontWeight: "bold",
    marginRight: 10,
  },
  userProfilePicture: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "white",
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    color: "white",
  },
  userDetailTexts: {
    flex: 1,
    marginLeft: 15,
    // borderWidth: 1,
    // borderColor: 'white',
  },
  userName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  userBalance: {
    color: "white",
    fontSize: 16,
  },
  userBalanceText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  userBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  userBadgeTitle: {
    color: "white",
    fontSize: 14,
    marginRight: 10,
  },
  badgeImage: {
    borderColor: "gold",
    borderWidth: 2,
    borderRadius: 10,
    width: 20,
    height: 20,
    resizeMode: "cover",
    marginRight: 5,
  },
  seeBadges: {
    backgroundColor: "green",
    borderRadius: 15,
    padding: 5,
    elevation: 2,
    shadowColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
  },
  seeBadgesText: {
    fontSize: 9,
    color: "gold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: "green",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 9,
    fontSize: 7,
    textAlign: "center",
  },
  modalTitle: {
    color: "brown",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  badgeImageModal: {
    borderColor: "gold",
    borderWidth: 2,
    borderRadius: 25,
    width: 50,
    height: 50,
    resizeMode: "cover",
    marginBottom: 8,
  },
});
