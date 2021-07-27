import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { dateFormatter } from "../helpers/dateFormatter";
import { postTransaction, fetchTransaction } from "../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditExpense({ navigation, route }) {
  // !handle upload image di edit, butuh upload lagi?
  const dispatch = useDispatch();
  // const {TransactionId} = route.params
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [receiptImage, setReceiptImage] = useState("");
  const [UserId, setUserId] = useState("");
  const [dataAsyncUser, setDataAsyncUser] = useState("");

  async function getItem() {
    const dataAsyncUser = await AsyncStorage.getItem("@dataUser");
    setDataAsyncUser(JSON.parse(dataAsyncUser));
  }
  useEffect(() => {
    getItem();
  }, []);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const expenseChoices = [
    "Housing",
    "Transportation",
    "Food & Beverage",
    "Utilities",
    "Insurance",
    "Medical & Healthcare",
    "Saving, Investing, & Debt Payments",
    "Personal Spending",
    "Other Expense",
  ];
  const incomeChoices = [
    "Salary",
    "Wages",
    "Commission",
    "Interest",
    "Investments",
    "Gifts",
    "Allowance",
    "Other Income",
  ];
  const expenseItems = expenseChoices.map((ele) => ({
    label: ele,
    value: ele,
  }));
  const incomeItems = incomeChoices.map((ele) => ({ label: ele, value: ele }));

  useEffect(() => {
    if (dataUser.access_token) {
      async function fetchStart() {
        await dispatch(fetchTransaction(+dataUser.data.id)); //2
        await dispatch(fetchTransaction(+dataUser.data.id));
        const transaction = useSelector((state) => state.transaction);
        // console.log(transaction)
        setType(transaction.type);
        setCategory(transaction.category);
        setName(transaction.name);
        setDate(transaction.date);
        setAmount(transaction.amount);
        setUserId(transaction.UserId);
        setReceiptImage(transaction.receiptImage);
        setIsLoading(false);
      }
      fetchStart();
    }
  }, []);

  const expenseChoices = [
    "Housing",
    "Transportation",
    "Food & Beverage",
    "Utilities",
    "Insurance",
    "Medical & Healthcare",
    "Saving, Investing, & Debt Payments",
    "Personal Spending",
    "Other Expense",
  ];
  const incomeChoices = [
    "Salary",
    "Wages",
    "Commission",
    "Interest",
    "Investments",
    "Gifts",
    "Allowance",
    "Other Income",
  ];
  const expenseItems = expenseChoices.map((ele) => ({
    label: ele,
    value: ele,
  }));
  const incomeItems = incomeChoices.map((ele) => ({ label: ele, value: ele }));
  const [dataUser, setDataUser] = useState("");

  async function getItem() {
    const dataUser = await AsyncStorage.getItem("@dataUser");
    setDataUser(JSON.parse(dataUser));
  }

  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    if (dataUser.access_token) {
      async function fetchStart() {
        await dispatch(fetchTransaction(+dataUser.data.id));
        const transaction = useSelector((state) => state.transaction);
        setType(transaction.type);
        setCategory(transaction.category);
        setName(transaction.name);
        setDate(transaction.date);
        setAmount(transaction.amount);
        // setReceiptImage(transaction.type)
      }
      fetchStart();
    }
  }, []);

  const dateHandler = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "android");
    setDate(currentDate);
  };

  async function submitHandler(e) {
    // data diubah jadi form
    // const data = { type, category, name, date, amount, receiptImage }
    // console.log(data)
    const payload = new FormData();
    payload.append("type", type);
    payload.append("category", category);
    payload.append("name", name);
    payload.append("fullDate", date.toString());
    payload.append("amount", amount);
    payload.append("receiptImage", receiptImage);

    // console.log(payload)
    dispatch(postTransaction(payload, UserId));
    // navigation.navigate('Home')
  }

  if (isLoading)
    return (
      <View>
        <Text>Loading screen here</Text>
      </View>
    );

  return (
    <>
      <View style={styles.test}>
        <Text>Type</Text>
        <RNPickerSelect
          // onValueChange={(value) => setType(value)}
          placeholder={{ label: "Pick a type" }}
          selectedValue={type}
          onValueChange={setType}
          items={[
            { label: "Expense", value: "Expense" },
            { label: "Income", value: "Income" },
          ]}
        />
        <Text>Category</Text>
        <RNPickerSelect
          // onValueChange={(value) => setCategory(value)}
          placeholder={{ label: "Pick a type first" }}
          onValueChange={setCategory}
          selectedValue={category}
          items={
            type === "Expense"
              ? expenseItems
              : // type === 'Income'
                incomeItems
            // ? (incomeItems)
            // : [{ label: 'Pick a category first', value: '' }]
          }
        />
        <Text>RecordName</Text>
        <TextInput onChangeText={setName} value={name} />
        <Text>Date</Text>
        <Text>{dateFormatter(date)}</Text>
        <Button onPress={showDatepicker} title="Pick a date" />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={dateHandler}
          />
        )}
        <Text>Amount</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 15, flex: 1, textAlign: "center" }}>
            Rp{" "}
          </Text>
          <TextInput
            style={{ fontSize: 15, flex: 4, textAlign: "left" }}
            onChangeText={setAmount}
            value={amount}
            keyboardType="numeric"
          />
        </View>
        <Text>Receipt Image</Text>
        {receiptImage ? (
          <>
            {/* <Text>{JSON.stringify(receiptImage)}</Text> */}
            <Image
              style={styles.image}
              source={{
                uri: receiptImage.uri,
              }}
            />
            <Button
              onPress={() => setReceiptImage("")}
              title="Clear Image"
              style={styles.buttonStyle}
            />
          </>
        ) : (
          <Button
            onPress={uploadImageHandler}
            title="Upload Image"
            style={styles.buttonStyle}
          />
        )}
        <Button
          onPress={submitHandler}
          title="Submit Record"
          style={styles.buttonStyle}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
    backgroundColor: "blue",
    color: "black",
  },
  buttonStyle: {
    backgroundColor: "green",
  },
});
