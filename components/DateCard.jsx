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
} from "react-native";

export default function DateCard({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.textWarning}>You Have No Recorded Transactions</Text> */}
      <View style={{ alignItems: "center" }}>
        <View style={styles.cardPerDate}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={styles.textDateCard}>10 July</Text>
            <Text style={styles.textTotalCard}>-1,550,000</Text>
          </View>
          <Text style={styles.borderTitleCard}></Text>
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
              <Text style={styles.simbolListCard}>-</Text>
              <Text style={styles.textListCard}>Food and Beverage</Text>
            </View>
            <Text style={styles.textListCard}>-500,000</Text>
          </View>
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
              <Text style={styles.simbolListCard}>-</Text>
              <Text style={styles.textListCard}>Transportion</Text>
            </View>
            <Text style={styles.textListCard}>-50,000</Text>
          </View>
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
              <Text style={styles.simbolListCard}>-</Text>
              <Text style={styles.textListCard}>Health</Text>
            </View>
            <Text style={styles.textListCard}>-1,000,000</Text>
          </View>
        </View>
      </View>
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
    width: 310,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  simbolListCard: {
    fontSize: 17,
    marginLeft: 20,
  },
  textListCard: {
    fontSize: 15,
    paddingHorizontal: 10,
  },
});
