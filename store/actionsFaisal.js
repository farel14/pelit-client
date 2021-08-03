import {
  SET_ALL_TRANSACTION_USER,
  SET_TRANSACTION_BY_CATEGORY,
  SET_TRANSACTION_BY_DATE,
  SET_LOADING_TRANSACTION,
  SET_IS_LOGIN,
  SET_ERROR_LOGIN,
} from "./actionTypesFaisal";
import {
Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function setIsLogin(input) {
  return {
    type: SET_IS_LOGIN,
    payload: input,
  };
}

export function setErrorLogin(input) {
  return {
    type: SET_ERROR_LOGIN,
    payload: input,
  };
}

export function setAllTransactionUser(input) {
  return {
    type: SET_ALL_TRANSACTION_USER,
    payload: input,
  };
}

export function setTransactionByCategoty(input) {
  return {
    type: SET_TRANSACTION_BY_CATEGORY,
    payload: input,
  };
}

export function setTransactionByDate(input) {
  return {
    type: SET_TRANSACTION_BY_DATE,
    payload: input,
  };
}

export function setLoadingTransaction(input) {
  return {
    type: SET_LOADING_TRANSACTION,
    payload: input,
  };
}

export function fetchLoginUser(email, password) {  
  console.log(email, password, 'email', 'password')
  let result = {}
  return async (dispatch) => {
    dispatch(setLoadingTransaction(true))
    try {
      const response = await fetch("https://pelit-app.herokuapp.com/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.replace(" ", ""),
          password,
        }),
      });
      result = await response.json();

      if (result.access_token) {
        console.log(result, 'MASUK')
        await AsyncStorage.setItem("@dataUser", JSON.stringify(result));
        console.log('SUDAH MASUK')
        dispatch(setIsLogin(true));
        dispatch(setAllTransactionUser(result.data));
        dispatch(setLoadingTransaction(false))
      } else if (result.message = 'Wrong Email/Password') {
        dispatch(setLoadingTransaction(false))
        console.log(result)
        Alert.alert("Wrong email/password");
        dispatch(setIsLogin(false));
      }
    } catch (err) {
      console.log(err)
    }
  };
}

export function fetchRegisterUser(fullName, email, password) {
  return async (dispatch) => {
    try {
      const response = await fetch("https://pelit-app.herokuapp.com/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.replace(" ", ""),
          password,
          fullName,
        }),
      });
      const result = await response.json();
      return result.message;
    } catch (err) {
      console.log("error di fetch register", err);
    }
  };
}

export function fetchTransactionByDate(month, data) {
  return async (dispatch) => {
    try {
      dispatch(setLoadingTransaction(true));
      if (data) {
        const response = await fetch(
          `https://pelit-app.herokuapp.com/transactions/date/${
            data.id
          }/${+month}`
        );
        const result = await response.json();
        dispatch(setTransactionByDate(result));
      }
    } catch (err) {
      console.log("error di fetch transaction by date", err);
    } finally {
      dispatch(setLoadingTransaction(false));
    }
  };
}

export function fetchTransactionByCategory(month, data) {
  return async (dispatch) => {
    try {
      dispatch(setLoadingTransaction(true));
      if (data) {
        const response = await fetch(
          `https://pelit-app.herokuapp.com/transactions/category/${
            data.id
          }/${+month}`
        );
        const result = await response.json();
        dispatch(setTransactionByCategoty(result));
      }
    } catch (err) {
      console.log("error di fetch transaction by date", err);
    } finally {
      dispatch(setLoadingTransaction(false));
    }
  };
}

export function fetchDeleteTransaction(id) {
  console.log(id, "ini transaction id");
  return async (dispatch) => {
    try {
      dispatch(setLoadingTransaction(true));
      const response = await fetch(
        `https://pelit-app.herokuapp.com/transactions/${id}`,
        { method: "delete" }
      );
      const result = await response.json();
      console.log(result, "ini delete");
      return result;
    } catch (err) {
      console.log("error di fetch transaction by date", err);
    } finally {
      dispatch(setLoadingTransaction(false));
    }
  };
}
