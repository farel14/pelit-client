import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { postTransaction, fetchTransaction } from "../store/actions";
import { dateFormatter } from "../helpers/dateFormatter";

export default function EditExpense({ navigation, route }) {
  // !handle upload image di edit, butuh upload lagi?
  const dispatch = useDispatch();
  const { TransactionId } = route.params;
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [receiptImage, setReceiptImage] = useState("");

  const [UserId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const transaction = useSelector((state) => state.transaction);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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

    async function fetchStart() {
      setIsLoading(true)
      // await dispatch(fetchTransaction(2))
      await dispatch(fetchTransaction(TransactionId))
      // console.log(transaction)
      setType(transaction.type)
      setCategory(transaction.category)
      setTitle(transaction.title)
      setDate(new Date(transaction.fullDate))
      setAmount(transaction.amount)
      setUserId(transaction.UserId)
      setReceiptImage(transaction.receiptImage)
      setIsLoading(false)
    }
    fetchStart()
  }, [])

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

    const dateParse = date.toLocaleDateString('id-ID')

    const payload = new FormData();
    payload.append("type", type);
    payload.append("category", category);
    payload.append("title", title);
    payload.append("fullDate", dateParse);
    payload.append("note", note);

    payload.append("amount", amount);
    payload.append("receiptImage", receiptImage);

    dispatch(postTransaction(payload, UserId))
    navigation.navigate('Home')
  }

  if (isLoading) return (<View><Text>Loading screen here</Text></View>)

  return (
    <>
      <View style={styles.test}>
        {/* <View>
                    <Button onPress={showDatepicker} title="Show date picker!" />
                </View>
                <View>
                    <Button onPress={showTimepicker} title="Show time picker!" />
                </View> */}
        {/* <Button
                    title="Type"
                    disabled
                    onPress={() => Alert.alert('Cannot press this one')}
                /> */}
        <Text>Type</Text>
        <RNPickerSelect
          // onValueChange={(value) => setType(value)}
          placeholder={{ label: "Pick a type" }}
          onValueChange={setType}
          selectedValue={type}
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
          items={
            type === "Expense"
              ? expenseItems
              : // type === 'Income'
              incomeItems
            // ? (incomeItems)
            // : [{ label: 'Pick a category first', value: '' }]
          }
          selectedValue={category}

        />
        <Text>RecordName</Text>
        <TextInput onChangeText={setTitle} />
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
        <TextInput onChangeText={setAmount}
          keyboardType="numeric"
          selectedValue={amount}
        />
        <Text>Receipt Image</Text>
        {/* upload handler */}
        <Button
          onPress={submitHandler}
          title="Submit Record"
          color="white"
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
