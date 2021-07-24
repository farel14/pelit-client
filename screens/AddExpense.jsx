import React from "react";
import { View, Text, Button, StyleSheet } from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";

export default function AddExpense() {
    const dispatch = useDispatch()
    const [type, setType] = useState('')
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState(0)
    const [receiptImage, setReceiptImage] = useState('')

    // imagekit here

    async function submitHandler(e) {
        // data diubah jadi form
        const data = { type, category, name, date, amount, receiptImage }
        dispatch()

        try {
            let res = await fetch('http://localhost:3000/transactions', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            res = await res.json()
            console.log('Success:', res);
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <>
            <View style={styles.test}>
                <Text style={{color: 'black'}}>HAHAHAHAHSADHASD</Text>
                <Text>HAHAHAHAHSADHASD</Text>
                <Text>HAHAHAHAHSADHASD</Text>
                <Text>HAHAHAHAHSADHASD</Text>
                <Text>HAHAHAHAHSADHASD</Text>
                <Text>HAHAHAHAHSADHASD</Text>
                <Text>HAHAHAHAHSADHASD</Text>
                <Text>HAHAHAHAHSADHASD</Text>
                <Text>HAHAHAHAHSADHASD</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    test: {
        flex: 1,
        backgroundColor: 'blue',
        color: 'black'
    }
})