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
import DateCard from "../components/DateCard";
import { monthYearFormatter } from "../helpers/dateFormatter";

export default function Home({ navigation, route }) {
  const { dataUser } = route.params;
  const date = new Date();
  const monthYear = monthYearFormatter(date);
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
            <Text style={styles.textTop}>{monthYear}</Text>
            <TouchableOpacity style={styles.buttonAdd}>
              <Text style={styles.textAdd}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textTop}>Hi, {dataUser.fullName}!</Text>
        </View>

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
            {dataUser.Transactions.totalIncome}
          </Text>
          <Text style={styles.colBody}>
            {dataUser.Transactions.totalExpense}
          </Text>
          <Text style={styles.colBody}>{dataUser.balance}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text style={styles.textGroupBy}>Group By:</Text>
          <TouchableOpacity style={styles.buttonDate}>
            <Text style={styles.textGroupBy}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCategory}>
            <Text style={styles.textGroupBy}>Category</Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.textWarning}>You Have No Recorded Transactions</Text> */}
        <DateCard></DateCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A2DBFA",
  },
  textTop: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  colTitle: {
    width: 110,
    marginTop: 10,
    fontSize: 18,
    textAlign: "center",
  },
  colBody: {
    width: 110,
    fontSize: 15,
    textAlign: "center",
  },
  textGroupBy: {
    fontSize: 18,
  },
  buttonCategory: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#87A7B3",
    borderRadius: 7,
  },
  buttonDate: {
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
    marginTop: 5,
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  textAdd: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});
