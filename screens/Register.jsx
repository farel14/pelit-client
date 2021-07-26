import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisterUser } from "../store/actionsFaisal";

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const keyboardVerticalOffset = Platform.OS === "android" ? -25 : 0;

  function handleRegisterButton() {
    if (!email && !password)
      Alert.alert("Please input your email and password");
    else if (!email) Alert.alert("Please input your email");
    else if (!password) Alert.alert("Please input your password");
    else {
      dispatch(fetchRegisterUser(fullName, email, password)).then((message) => {
        if (message === "Registered Successfully") {
          Alert.alert("Registered has been successfully");
          navigation.navigate("Login");
        } else {
          Alert.alert(message);
        }
        console.log(message, "ini data");
      });
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
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
          secureTextEntry={true}
          onChangeText={(e) => setPassword(e)}
        ></TextInput>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={handleRegisterButton}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    marginLeft: 90,
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
