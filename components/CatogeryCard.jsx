import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { monthYearFormatter, monthFormatter } from "../helpers/dateFormatter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionByCategory } from "../store/actionsFaisal";
import FieldCardCategory from "./FieldCardCategory";

export default function CategoryCard({ navigation }) {
  const dispatch = useDispatch();
  const [dataAsyncUser, setDataAsyncUser] = useState("");
  const date = new Date();
  const monthYear = monthYearFormatter(date);
  let dataTransByCategory = useSelector((state) => state.transByCategory);

  async function getItem() {
    const dataAsyncUser = await AsyncStorage.getItem("@dataUser");
    setDataAsyncUser(JSON.parse(dataAsyncUser));
  }
  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    dispatch(
      fetchTransactionByCategory(monthYear.numMonth, dataAsyncUser.data)
    );
  }, [dataTransByCategory]);

  if (!dataAsyncUser || !dataTransByCategory.length) return null;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.textWarning}>You Have No Recorded Transactions</Text> */}
      {dataTransByCategory.map((data, index) => (
        <View style={{ alignItems: "center" }} key={index}>
          <View style={styles.cardPerDate}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={styles.textDateCard}>{data.category}</Text>
              <Text style={styles.textTotalCard}>{data.total}</Text>
            </View>
            <Text style={styles.borderTitleCard}></Text>

            {data.items.map((item, index) => (
              <FieldCardCategory key={index} item={item}></FieldCardCategory>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A2DBFA",
  },
  cardPerDate: {
    width: 340,
    backgroundColor: "white",
    marginTop: 30,
    borderRadius: 20,
    paddingVertical: 10,
  },
  textDateCard: {
    width: 200,
    fontSize: 17,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  textTotalCard: {
    fontSize: 17,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  borderTitleCard: {
    height: 2,
    width: 320,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
});
