import {
  SET_ALL_TRANSACTION_USER,
  SET_TRANSACTION_BY_CATEGORY,
  SET_TRANSACTION_BY_DATE,
  SET_LOADING_TRANSACTION,
  SET_IS_LOGIN,
} from "./actionTypesFaisal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function setIsLogin(input) {
  return {
    type: SET_IS_LOGIN,
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
  return async (dispatch) => {
    try {
      const response = await fetch("http://192.168.100.9:3000/login", {
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
      const result = await response.json();

      if (result.access_token) {
        await AsyncStorage.setItem("@dataUser", JSON.stringify(result));
        dispatch(setIsLogin(true));
        dispatch(setAllTransactionUser(result.data));
      } else {
        dispatch(setIsLogin(false));
      }
    } catch (err) {
      console.log("error di fetch login", err);
    }
  };
}

export function fetchRegisterUser(fullName, email, password) {
  return async (dispatch) => {
    try {
      const response = await fetch("http://192.168.100.9:3000/register", {
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
          `http://192.168.100.9:3000/transactions/date/${
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
          `http://192.168.100.9:3000/transactions/category/${
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
        `http://192.168.100.9:3000/transactions/${id}`,
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
