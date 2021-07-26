import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import RNPickerSelect from 'react-native-picker-select'
import DateTimePicker from '@react-native-community/datetimepicker';
import {postTransaction} from '../store/actions'

export default function AddExpense({ navigation, route }) {
    const dispatch = useDispatch()
    const [type, setType] = useState('')
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date())
    const [amount, setAmount] = useState(0)
    const [receiptImage, setReceiptImage] = useState('')
    const [UserId, setUserId] = useState('')

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const expenseChoices = ['Housing', 'Transportation', 'Food & Beverage', 'Utilities', 'Insurance', 'Medical & Healthcare', 'Saving, Investing, & Debt Payments', 'Personal Spending', 'Other Expense']
    const incomeChoices = ['Salary', 'Wages', 'Commission', 'Interest', 'Investments', 'Gifts', 'Allowance', 'Other Income']
    const expenseItems = expenseChoices.map(ele => ({ label: ele, value: ele }))
    const incomeItems = incomeChoices.map(ele => ({ label: ele, value: ele }))

    useEffect(() => {
        async function fetchStart() {
            const dataAsyncUser = await AsyncStorage.getItem('@dataUser')
            setUserId(dataAsyncUser.id)
        }
        fetchStart()
    }, [])

    const dateHandler = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'android');
        setShow(false)
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    // imagekit here

    async function submitHandler(e) {
        // data diubah jadi form
        const data = { type, category, name, date, amount, receiptImage }
        // console.log(data)
        const payload = new FormData();
        payload.append("type", type);
        payload.append("category", category);
        payload.append("name", name);
        payload.append("fullDate", date.toSt);
        payload.append("amount", amount);
        payload.append("receiptImage", receiptImage);
  
        // console.log(payload)
        dispatch(postTransaction(payload, userid))
        // navigation.navigate('Home')
    }

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
                    placeholder={{ label: 'Pick a type' }}
                    onValueChange={setType}
                    items={[
                        { label: 'Expense', value: 'Expense' },
                        { label: 'Income', value: 'Income' },
                    ]}
                />
                <Text>Category</Text>
                <RNPickerSelect
                    // onValueChange={(value) => setCategory(value)}
                    placeholder={{ label: 'Pick a type first' }}
                    onValueChange={setCategory}
                    items={
                        type === 'Expense'
                            ? (expenseItems)
                            : (
                                // type === 'Income'
                                    incomeItems
                                    // ? (incomeItems)
                                    // : [{ label: 'Pick a category first', value: '' }]
                            )
                    }
                />
                <Text>RecordName</Text>
                <TextInput onChangeText={setName} />
                <Text>Date</Text>
                <Button onPress={showDatepicker} title="Pick a date" />
                {show && (<DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={dateHandler}
                />
                )}
                <Text>Amount</Text>
                <TextInput onChangeText={setAmount} keyboardType='numeric' />
                <Text>Receipt Image</Text>
                {/* upload handler */}
                <Button
                    onPress={submitHandler}
                    title="Submit Record"
                    color='white'
                    style={styles.buttonStyle}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    test: {
        flex: 1,
        backgroundColor: 'blue',
        color: 'black'
    },
    buttonStyle: {
        backgroundColor: 'green',
        color: 'black'
    }
})