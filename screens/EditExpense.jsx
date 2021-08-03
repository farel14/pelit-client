import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { postTransaction, fetchTransaction } from "../store/actions";
import { dateFormatter } from "../helpers/dateFormatter";
import { Provider, TextInput } from "react-native-paper";
import DropDown from "../helpers/react-native-paper-dropdown";

export default function EditExpense({ navigation, route }) {
  // !handle upload image di edit, butuh upload lagi?
  const dispatch = useDispatch();
  // const { id } = route.params.item;
  const keyboardVerticalOffset = Platform.OS === "android" ? 100 : 0;
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  let [receiptImage, setReceiptImage] = useState("");
  const [UserId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const transaction = useSelector((state) => state.transaction);
  const [typeDropDown, setTypeDropDown] = useState(false);
  const [categoryDropDown, setCategoryDropDown] = useState(false);

  const [showDropDown, setShowDropDown] = useState(false);

  // const loadingtransaction = useSelector((state) => state.loadingTransaction);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const expenseChoices = [
    {label: 'Housing', value: 'Housing'},
    {label: 'Transportation', value: 'Transportation'},
    {label: 'Food & Beverage', value: 'Food & Beverage'},
    {label: 'Utilities', value: 'Utilities'},
    {label: 'Insurance', value: 'Insurance'},
    {label: 'Medical & Healthcare', value: 'Medical & Healthcare'},
    {label: 'Invest & Debt', value: 'Invest & Debt'},
    {label: 'Personal Spending', value: 'Personal Spending'},
    {label: 'Other Expense', value: 'Other Expense'},
  ];
  const incomeChoices = [
    {label: 'Salary', value: 'Salary'},
    {label: 'Wages', value: 'Wages'},
    {label: 'Commission', value: 'Commission'},
    {label: 'Interest', value: 'Interest'},
    {label: 'Investments', value: 'Investments'},
    {label: 'Gifts', value: 'Gifts'},
    {label: 'Allowance', value: 'Allowance'},
    {label: 'Other Income', value: 'Other Income'},
  ];

  const expenseItems = expenseChoices.map((ele) => ({
    label: ele,
    value: ele,
  }));
  const incomeItems = incomeChoices.map((ele) => ({ label: ele, value: ele }));

  useEffect(() => {
    // await dispatch(fetchTransaction(2))
    dispatch(fetchTransaction(route.params.item.id));
  }, []);

  useEffect(() => {
    setType(transaction.type);
    setCategory(transaction.category);
    setTitle(transaction.title);
    setDate(new Date(transaction.fullDate));
    setAmount(`${transaction.amount}`);
    setUserId(transaction.UserId);
    setReceiptImage(transaction.receiptImage);
  }, [transaction]);

  const dateHandler = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "android");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  async function submitHandler(e) {
    // data diubah jadi form
    // const data = { type, category, title, date, amount, receiptImage }
    // console.log(data)

    const dateParse = date.toLocaleDateString("id-ID");

    const payload = new FormData();
    payload.append("type", type);
    payload.append("category", category);
    payload.append("title", title);
    payload.append("fullDate", dateParse);
    payload.append("note", note);

    payload.append("amount", amount);
    payload.append("receiptImage", receiptImage);

    dispatch(postTransaction(payload, UserId));
    navigation.navigate("Home");
  }

  if (isLoading || !amount)
    return (
      <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
    );

  if (!receiptImage)
    receiptImage =
      "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";

  return (
    <>
    <Provider>
    <ScrollView contentContainerStyle={styles.containerStyle}>
    <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >

      <View style={{ marginRight: 30, marginTop:10, flexDirection: "row", justifyContent:'space-between', alignItems: 'center'}}>
          <Text style={styles.typeDate}>Transaction Date*</Text>
          <Text>{dateFormatter(date)}</Text>
        </View>
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

        <View style={{marginTop: 20}}>
          <DropDown
            label={"Record Type*"}
            mode={"outlined"}
            value={type}
            setValue={setType}
            list={[{label: 'Expense', value: 'Expense'},{label: 'Income', value: 'Income'}]}
            visible={typeDropDown}
            showDropDown={() => setTypeDropDown(true)}
            onDismiss={() => setTypeDropDown(false)}
            inputProps={{
              right: <TextInput.Icon name={"menu-down"} />,
            }}
          />
          </View>

        <View style={{marginTop: 20}}>
        <DropDown
          label={"Category*"}
          mode={"outlined"}
          value={category}
          setValue={setCategory}
          list={
            type === "Expense"
              ? expenseChoices
              : incomeChoices
          }
          visible={categoryDropDown}
          showDropDown={() => setCategoryDropDown(true)}
          onDismiss={() => setCategoryDropDown(false)}
          inputProps={{
            right: <TextInput.Icon name={"menu-down"} />,
          }}
            />
        </View>

        <View style={{marginTop: 20}}>
        <TextInput
        label="Record Title*"
        value={title}
        mode={"outlined"}
        onChangeText={text => setTitle(text)}
        />
        </View>
        
        <View style={{marginTop: 20}}>
        <TextInput
        label="Amount*"
        value={amount}
        mode={"outlined"}
        keyboardType="numeric"
        onChangeText={text => setAmount(text)}
        />
        </View>
        </KeyboardAvoidingView>

        <View style={{marginTop: 20, textAlign: 'center'}}>
        <Text style={{marginBottom: 20, fontWeight: 'bold'}}>Receipt Image</Text>
        <Image
          style={receiptImage == 'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png' ? styles.receiptImageEmpty : styles.receiptImage}
          source={{
            uri: `${receiptImage}`,
          }}
        />
        </View>
        {
          type && category && title && amount ?
          <View style={{marginTop: 20, marginBottom: 30}}>
          <Button
            onPress={submitHandler}
            title="Submit Record"
            color="black"
            style={styles.buttonStyle}
          />
          </View>  
          :
          <View style={{marginTop: 20, marginBottom: 30}}/>        
        }

      </ScrollView>
      </Provider>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    color: "black",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonStyle: {
    backgroundColor: "green",
  },
  receiptImage: {
    width: 350,
    height: 200,
    resizeMode:"center"
  },
  receiptImageEmpty: {
    width: 50,
    height: 50,
    resizeMode:"center"
  },
  containerStyle: {
    flexGrow: 1,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  typeDate: {
    marginTop: 20,
    // backgroundColor: "black",
    fontWeight: 'bold',
    marginBottom: 10,
    // width: '80%',
    color: "black",
    textAlign: "center",
    borderRadius: 5,
    height: 22,
  },
});
