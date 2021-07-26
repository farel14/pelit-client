import React, {useState} from "react";
import { View, Image, StyleSheet, TextInput, Modal, ScrollView, Pressable, Button, Text } from "react-native"
import { dateFormatter, monthFormatterFromDate } from '../helpers/dateFormatter.js'
import NumberFormat from 'react-number-format'
import TargetProgress from "./TargetProgress.jsx"
import { useSelector, useDispatch } from 'react-redux'
import { getUserActiveTarget } from '../store/actionsGaluh'
import {Picker} from '@react-native-picker/picker';

export default function SpendSummary({ navigation, route, allSpending, user }) {
    // console.log(user)
    const userId = user.id
    const dispatch = useDispatch()
    const select = useSelector    
    const today = dateFormatter(new Date())
    const month = monthFormatterFromDate(new Date())
    let dateToday = new Date()
    let monthToday = dateToday.getMonth() + 1
    const dateNum = dateToday.getDate()
    const activeTarget = select(state => state.activeTarget)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [targetAmount, setTargetAmount] = useState('')
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    const beginningOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

    let spending = 0

    for (let i = 0; i < allSpending.data.length; i++) {
        if (allSpending.data[i].month == monthToday) {
            if (allSpending.data[i].type == 'Expense') {
                spending += allSpending.data[i].amount
            }
        }
    }

    const projection = spending/dateNum * 31

    function changeTargetAmount(text) {
        setTargetAmount(text)
      }

    function setTarget(e) {
        e.preventDefault()
        setModalVisible(!modalVisible)
        console.log('function add target')
        let newTarget = {}
        newTarget.startDate = beginningOfMonth
        newTarget.endDate = endOfMonth
        newTarget.monthlyTarget = targetAmount

        fetch(`https://pelit-app.herokuapp.com/target/all/${userId}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTarget)
        })
        .then(data => {
            alert('Success adding target!')
            // console.log('SUCCESS', data)
            dispatch(getUserActiveTarget(userId))
        })
        .catch(err => {
            // console.log(err)
            alert('Can not set target')
        })
    }

    function deleteTarget(e) {
        e.preventDefault()
        fetch(`https://pelit-app.herokuapp.com/target/status/${userId}`, {
            method: "PATCH"
          })
          .then(data => {
              alert('You have removed your target')
              // console.log('SUCCESS', data)
              dispatch(getUserActiveTarget(userId))
          })
          .catch(err => {
              // console.log(err)
              alert('Can not remove target')
          })
    }

    return (
        <ScrollView>
        {
            activeTarget ? 
            <>
            <TargetProgress activeTarget={activeTarget} spending={spending} projection={projection} />
            <View style={styles.container}>
                <Text style={styles.summaryText}>Summary for the Month of {month}</Text>
                <View style={{marginBottom: 15}}/>

                <Text style={{color:'white'}}>Total spending: <NumberFormat value={spending} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'Rp '} renderText={formattedValue => <Text style={styles.summaryAmountSmall}>{formattedValue}</Text>} /></Text>                    
                <Text style={{color:'white'}}>End-of-month Projection: <NumberFormat value={projection} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'Rp '} renderText={formattedValue => <Text style={styles.summaryAmountSmall}>{formattedValue}</Text>} /></Text>                    
                
                <View style={{marginBottom: 30}}/>
                <Button title='Remove Target' onPress={(e) => deleteTarget(e)} color='grey'/>
                <View style={{marginBottom: 40}}/>
            </View>
            </>
            :
            <View style={styles.container}>
            <Text style={styles.summaryText}>Total spend This Month</Text>
            <NumberFormat value={spending} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'Rp '} renderText={formattedValue => <Text style={styles.summaryAmount}>{formattedValue}</Text>} />
            <View style={{marginBottom: 40}}/>
            <Text style={styles.summaryText}>Your spend projection until end of {month}</Text>
            <NumberFormat value={projection} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'Rp '} renderText={formattedValue => <Text style={styles.summaryAmount}>{formattedValue}</Text>} />
            <View style={{marginBottom: 40}}/>
            <Pressable
                    onPress={() => setModalVisible(!modalVisible)}
                    style={[styles.button, styles.shadowProp]}>
                    <Text style={styles.buttonText}>Set spending target and earn badges!
                    </Text>
            </Pressable> 

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.formTitle}>Enter Amount</Text>
        
                        <TextInput style={styles.nameForm}
                        editable
                        onChangeText={(text) => changeTargetAmount(text)}
                        placeholder='e.g 2000000'
                        placeholderTextColor="darkgrey"
                        keyboardType = 'numeric'
                        value={targetAmount}>
                        </TextInput>

                    <Pressable
                        style={[styles.buttonModalSubmit]}
                        onPress={(e) => setTarget(e)}
                        >
                        <Text style={styles.textStyleSubmit}>Add Target</Text>
                    </Pressable>
                    
                    <Pressable
                        style={[styles.buttonModalClose, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>

                    </View>
                    </View>  
            </Modal>     

        </View>
        }
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 7,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },  
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
    },
    summaryText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    summaryAmount: {
        fontSize: 18,
        color: 'lime'
    },
    button: {
        width: '70%',
        borderRadius: 10,
        marginBottom: 100,
        backgroundColor: 'maroon',
        elevation: 10
    },
    buttonModalSubmit: {
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        elevation: 2,
        backgroundColor: 'maroon',
      },
      buttonModalClose: {
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        elevation: 2
      },
    buttonText: {
        paddingHorizontal: 7,
        paddingVertical: 5,
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    },
    shadowProp: {
        shadowColor: 'white',
        shadowOffset: {width: 2, height: 10},
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 10
    },
    nameForm: {
        marginVertical: 10,
        width: '80%',
        height: 40,
        color: 'black',
        textAlign: 'center',
        borderColor: 'darkgrey',
        borderWidth: 2,
        padding: 10,
        // fontStyle: 'italic',
        // borderBottomColor: 'lightgrey',
        // borderBottomWidth: StyleSheet.hairlineWidth
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: 300,
        backgroundColor: "lightblue",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    formTitle: {
        color: 'black',
        fontSize: 18, 
        fontWeight: 'bold',
        padding: 5, 
        borderBottomColor: 'lightgrey', 
        borderBottomWidth: StyleSheet.hairlineWidth, 
        marginBottom: 5, 
        textAlign:'center'
      },
    textStyleSubmit: {
        color: 'white'
    }
  });