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
import { fetchTransactionByDate } from "../store/actionsFaisal";

export default function FieldCardCategory({ item }) {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: 200,
          }}
        >
          {/* <Text style={styles.simbolListCard}>-</Text> */}
          <Text style={styles.textListCard}>{item.nameDate}</Text>
        </View>
        <Text style={styles.textValueCard}>{item.amount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  simbolListCard: {
    fontSize: 17,
    marginLeft: 20,
  },
  textListCard: {
    fontSize: 15,
    paddingLeft: 20,
  },
  textValueCard: {
    fontSize: 15,
    paddingLeft: 10,
  },
});
