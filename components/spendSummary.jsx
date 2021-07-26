import React, {useState} from "react";
import { View, Image, StyleSheet, TextInput, ScrollView, Pressable, Button, Text } from "react-native"
import { dateFormatter, monthFormatterFromDate } from '../helpers/dateFormatter.js'
import NumberFormat from 'react-number-format'
import TargetProgress from "./TargetProgress.jsx"
import { useSelector } from 'react-redux'

const Separator = () => (
    <View style={styles.separator} />
);

export default function MyProfile({ navigation, route, allSpending }) {
    const select = useSelector    
    const today = dateFormatter(new Date())
    const month = monthFormatterFromDate(new Date())
    let dateToday = new Date()
    let monthToday = dateToday.getMonth() + 1
    const dateNum = dateToday.getDate()
    const [index, setIndex] = React.useState(0);
    const activeTarget = select(state => state.activeTarget)

    let spending = 0

    for (let i = 0; i < allSpending.data.length; i++) {
        if (allSpending.data[i].month == monthToday) {
            if (allSpending.data[i].type == 'Expense') {
                spending += allSpending.data[i].amount
            }
        }
    }

    const projection = spending/dateNum * 31

    return (
        <ScrollView>
        {
            activeTarget ? 
            <>
            <TargetProgress activeTarget={activeTarget} spending={spending} projection={projection}/>
            <View style={styles.container}>
                <Text style={styles.summaryText}>Summary for the Month of {month}</Text>
                <View style={{marginBottom: 15}}/>

                <Text style={{color:'white'}}>Total spending: <NumberFormat value={spending} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'Rp '} renderText={formattedValue => <Text style={styles.summaryAmountSmall}>{formattedValue}</Text>} /></Text>                    
                <Text style={{color:'white'}}>End-of-month Projection: <NumberFormat value={projection} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'Rp '} renderText={formattedValue => <Text style={styles.summaryAmountSmall}>{formattedValue}</Text>} /></Text>                    
                
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
                    style={[styles.button, styles.shadowProp]}>
                    <Text style={styles.buttonText}>Set spending target and earn badges!
                    </Text>
            </Pressable>      

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
  });