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
import { fetchLoginUser } from "../store/actionsFaisal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPasswordl] = useState("");
  const isLogin = useSelector((state) => state.isLogin);
  const keyboardVerticalOffset = Platform.OS === "android" ? 100 : 0;

  useEffect(() => {
    dispatch(fetchLoginUser(email, password));
  }, [email, password, dispatch]);

  async function handleLoginButton() {
    if (!email && !password)
      Alert.alert("Please input your email and password");
    else if (!email) Alert.alert("Please input your email");
    else if (!password) Alert.alert("Please input your password");
    else {
      if (isLogin) {
        navigation.navigate("Home");
      } else {
        Alert.alert("Wrong Email/Password");
      }
    }
  }

  function handleRegisterButton() {
    navigation.navigate("Register");
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

        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(e) => setEmail(e)}
        ></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(e) => setPasswordl(e)}
        ></TextInput>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.buttonLogin} onPress={handleLoginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
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
    marginLeft: 90,
  },
  text: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginTop: 35,
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
  buttonLogin: {
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: "#77ACF1",
    width: 300,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  buttonRegister: {
    borderRadius: 10,
    paddingVertical: 10,
    width: 300,
    backgroundColor: "#3C8DAD",
  },
});
