import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Button,
  Alert,
  Animated,
  Modal,
  Pressable,
} from "react-native";

export default function ModalItem({ item }) {
  return (
    <View>
      <View style={{ width: 100, marginLeft: 27 }}>
        <Text
          style={[
            item.type === "Expense" ? styles.typeExpense : styles.typeIncome,
            styles.type,
          ]}
        >
          {item.type}
        </Text>
      </View>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text
        style={[
          item.type === "Expense" ? styles.amountExpense : styles.amountIncome,
          styles.amount,
        ]}
      >
        {item.type === "Expense" ? item.amount : `+${item.amount}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  type: {
    borderWidth: 1,
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: 5,
    color: "black",
    paddingVertical: 3,
    fontStyle: "italic",
    fontSize: 15,
  },
  typeExpense: {
    borderColor: "red",
  },
  typeIncome: {
    borderColor: "green",
  },
  category: {
    marginTop: 5,
    fontStyle: "italic",
    fontSize: 13,
    textAlign: "center",
  },
  title: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  amount: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    fontStyle: "italic",
  },
  amountExpense: {
    color: "red",
  },
  amountIncome: {
    color: "green",
  },
});