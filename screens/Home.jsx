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
} from "react-native";
import DateCard from "../components/DateCard";
import { monthYearFormatter } from "../helpers/dateFormatter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "../components/CatogeryCard";

export default function Home({ navigation }) {
  const date = new Date();
  const monthYear = monthYearFormatter(date);
  const [dataUser, setDataUser] = useState("");
  const dataTransByDate = useSelector((state) => state.transByDate);
  const [displayCard, setDisplayCard] = useState("Date");

  async function getItem() {
    const dataUser = await AsyncStorage.getItem("@dataUser");
    setDataUser(JSON.parse(dataUser));
  }

  useEffect(() => {
    getItem();
  }, []);

  if (!dataUser || !dataTransByDate) return null;

  // console.log(dataUser, "data async");
  // console.log(dataTransByDate, "data trans by date");
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={styles.textTop}>{monthYear.name}</Text>
            <TouchableOpacity style={styles.buttonAdd}>
              <Text style={styles.textAdd}>+</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={styles.textTop}>Hi, {dataUser.data.fullName}!</Text>
            <TouchableOpacity>
              <Image
                style={styles.userProfilePicture}
                resizeMode="cover"
                borderRadius={40}
                source={{ uri: `${dataUser.data.photoProfile}` }}
              />
            </TouchableOpacity>
          </View>
        </View>

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
            <Text style={styles.colBody}>
              +{dataUser.data.Transactions.totalIncome}
            </Text>
            <Text style={styles.colBody}>
              -{dataUser.data.Transactions.totalExpense}
            </Text>
            <Text style={styles.colBody}>{dataUser.data.balance}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text style={styles.textGroupBy}>Group By:</Text>
          <TouchableOpacity
            style={
              displayCard === "Date"
                ? styles.buttonActive
                : styles.buttonInActive
            }
            onPress={() => setDisplayCard("Date")}
          >
            <Text style={styles.textGroupBy}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              displayCard === "Category"
                ? styles.buttonActive
                : styles.buttonInActive
            }
            onPress={() => setDisplayCard("Category")}
          >
            <Text style={styles.textGroupBy}>Category</Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.textWarning}>You Have No Recorded Transactions</Text> */}
        {displayCard === "Date" ? (
          <DateCard></DateCard>
        ) : (
          <CategoryCard></CategoryCard>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A2DBFA",
  },
  cardTitle: {
    backgroundColor: "green",
    marginTop: 10,
    marginHorizontal: 10,
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
  },
  colTitle: {
    width: 110,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  colBody: {
    width: 110,
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
  textGroupBy: {
    fontSize: 18,
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
    borderColor: "black",
  },
  textAdd: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});
