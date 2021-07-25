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

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  function handleRegisterButton() {
    if (!email && !password)
      Alert.alert("Please input your email and password");
    else if (!email) Alert.alert("Please input your email");
    else if (!password) Alert.alert("Please input your password");
    else {
      console.log(email, password, fullName);
      fetch("https://pelit-app.herokuapp.com/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password,
          fullName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          Alert.alert("Registered and password");
          navigation.navigate("Home");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png",
        }}
      />
      <Text style={styles.text}>Full Name</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(e) => setFullName(e)}
      ></TextInput>
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(e) => setEmail(e)}
      ></TextInput>
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(e) => setPassword(e)}
      ></TextInput>
      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={handleRegisterButton}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04009A",
    alignItems: "center",
    paddingTop: 50,
  },
  logo: {
    width: 130,
    height: 130,
  },
  text: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 20,
  },
  textInput: {
    fontSize: 17,
    width: 300,
    height: 40,
    backgroundColor: "#E8F0F2",
    color: "black",
    borderColor: "#053742",
    textAlign: "left",
    paddingLeft: 10,
    borderRadius: 10,
  },
  buttonRegister: {
    width: 300,
    height: 40,
    paddingVertical: 5,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 40,
    backgroundColor: "#77ACF1",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
