import React, { useState } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import DateCard from "../components/DateCard";
import { monthYearFormatter } from "../helpers/dateFormatter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "../components/CatogeryCard";
import NumberFormat from "react-number-format";
import { Banner } from "react-native-paper";
import { Icon } from "react-native-elements";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

export default function Home({ navigation }) {
  const [visible, setVisible] = React.useState(true);
  const date = new Date();
  const monthYear = monthYearFormatter(date);
  const [dataUser, setDataUser] = useState("");
  const dataTransByDate = useSelector((state) => state.transByDate);
  const [displayCard, setDisplayCard] = useState("Date");
  const [ok, setOK] = useState("false")
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  async function getItem() {
    const dataUser = await AsyncStorage.getItem("@dataUser");
    setDataUser(JSON.parse(dataUser));
  }

  // if (dataUser !== {}) {
  //   setOK(true)
  // }

  useEffect(() => {
    getItem();
  }, []);

  // console.log(dataTransByDate, dataUser, 'DATA HOME')
  if (!dataUser || !dataTransByDate) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.pageScrollContainer}>
        <ImageBackground
          style={{ flex: 1 }}
          //We are using online image to set background
          source={{
            uri: "https://wallpaperaccess.com/full/126397.jpg",
          }}
          //You can also set image from your project folder
          //require('./images/background_image.jpg')        //
        >
          <View style={styles.pageViewContainer}>
            <View style={styles.pageTitle}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={styles.textTop}>{monthYear.name}</Text>
                <TouchableOpacity
                  style={styles.buttonAdd}
                  onPress={() => navigation.navigate("AddRecord")}
                >
                  <Text style={styles.textAdd}>+</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={styles.textTop}>
                  Hi, {dataUser.data.firstName}!
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("My Dashboard")}
                >
                  <Image
                    style={styles.userProfilePicture}
                    resizeMode="cover"
                    borderRadius={40}
                    source={{ uri: `${dataUser.data.photoProfile}` }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Card>
              <Card.Cover
                source={{
                  uri: "https://ik.imagekit.io/77pzczg37zw/Pelit_Home_Banner-JPG_NoEZdIR5e.jpg?updatedAt=1627546581557",
                }}
                style={{ height: 150 }}
              />
            </Card>

            <View style={styles.cardTitle}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.colTitle}>Income</Text>
                <Text style={styles.colTitle}>Expense</Text>
                <Text style={styles.colTitle}>Balance</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <NumberFormat
                  value={'11250000'}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={0}
                  renderText={(formattedValue) => (
                    <Text style={styles.colBodyIncome}>{formattedValue}</Text>
                  )}
                />
                <NumberFormat
                  value={'-9326000'}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={0}
                  renderText={(formattedValue) => (
                    <Text style={styles.colBodyExpense}>-{formattedValue}</Text>
                  )}
                />
                <NumberFormat
                  value={dataUser.data.balance}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={0}
                  renderText={(formattedValue) => (
                    <Text style={styles.colBody}>{formattedValue}</Text>
                  )}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text style={[styles.textGroupBy, { color: "white" }]}>
                Group By:
              </Text>
              <TouchableOpacity
                style={
                  displayCard === "Date"
                    ? styles.buttonActive
                    : styles.buttonInActive
                }
                onPress={() => setDisplayCard("Date")}
              >
                <Text style={[styles.textGroupBy, { color: "black" }]}>
                  Date
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  displayCard === "Category"
                    ? styles.buttonActive
                    : styles.buttonInActive
                }
                onPress={() => setDisplayCard("Category")}
              >
                <Text style={[styles.textGroupBy, { color: "black" }]}>
                  Category
                </Text>
              </TouchableOpacity>
            </View>
            {dataUser.data.Transactions.data ? (
              dataUser.data.Transactions.data.length ? (
                displayCard === "Date" ? (
                  <DateCard navigation={navigation}></DateCard>
                ) : (
                  <CategoryCard navigation={navigation}></CategoryCard>
                )
              ) : (
                <Text style={styles.textWarning}>
                  You Have No Recorded Transactions
                </Text>
              )
            ) : (
              <ActivityIndicator size="large" color="#00ff00" />
            )}
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#A2DBFA",
  },
  pageScrollContainer: {
    flexGrow: 1,
  },
  cardTitle: {
    // backgroundColor: "green",
    marginTop: 10,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 30,
  },
  userProfilePicture: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 2,
    marginRight: 2,
  },
  textTop: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  colTitle: {
    width: 110,
    marginHorizontal: 7,
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  colBody: {
    width: 110,
    marginHorizontal: 7,
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
  colBodyExpense: {
    width: 110,
    marginHorizontal: 7,
    fontSize: 15,
    color: "gold",
    textAlign: "center",
  },
  colBodyIncome: {
    width: 110,
    marginHorizontal: 7,
    fontSize: 15,
    color: "lightgreen",
    textAlign: "center",
  },
  textGroupBy: {
    fontSize: 14,
  },
  buttonInActive: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#87A7B3",
    borderRadius: 7,
  },
  buttonActive: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#1EAE98",
    borderRadius: 7,
  },
  textWarning: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 20,
    color: "red",
  },
  buttonAdd: {
    backgroundColor: "red",
    marginTop: 2,
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
  },
  textAdd: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    textAlign: "center",
  },
  pageViewContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    // backgroundColor: "#A2DBFA",
  },
  pageTitle: {
    flexDirection: "row",
    marginBottom: 15,
    marginTop: 3,
    justifyContent: "space-between",
    // color: "white",
    alignItems: "center",
  },
});
