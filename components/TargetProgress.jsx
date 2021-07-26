import React, {useState} from "react";
import { Text, View, Image, StyleSheet, TextInput, ScrollView, Pressable, Button } from "react-native"
import ProgressBar from 'react-native-progress/Bar'
import NumberFormat from 'react-number-format'
import { dateFormatter } from "../helpers/dateFormatter";

const Separator = () => (
    <View style={styles.separator} />
);

export default function TargetProgress({navigation, route, activeTarget, spending, spendingBetween}) {
    const endDate = dateFormatter(new Date(activeTarget.endDate))
    let start = new Date(activeTarget.startDate)
    let now = new Date()
    let dateNum = (now.getTime() - start.getTime()) / (1000 * 3600 * 24)

    let totalSpend = +spendingBetween.total * -1
    const projection = totalSpend/dateNum * 31
    const progressPercentage = `${totalSpend / activeTarget.monthlyTarget * 100}%`
    const spendProgress = totalSpend / activeTarget.monthlyTarget
    let projectionPercentage = 0
    let flag = 'under'

        if (activeTarget.monthlyTarget > projection) {
            flag = 'under'
            projectionPercentage = `${Math.round(100-(projection / activeTarget.monthlyTarget * 100))}% under`
        } else {
            flag = 'over'
            projectionPercentage = `${Math.round((((projection / activeTarget.monthlyTarget) - 1) * 100))}% over`
        }
    
    // console.log('total spend', totalSpend)
    // console.log('projection', projection)
    // console.log('dateNum', dateNum)

    return (
        <>
        <Text style={styles.titleText}>Your Monthly Target Progress</Text>
        <View style={{marginTop: 10}}>
            <NumberFormat value={activeTarget.monthlyTarget} displayType={'text'} prefix={'Target Rp '} thousandSeparator={true} decimalScale={0} renderText={formattedValue => <Text style={styles.targetText}>{` ${formattedValue}`}</Text>} />
        </View>
        <Text style={styles.targetTextBold}><Text style={{color:'white'}}>From {dateFormatter(start)} to {endDate} </Text>
            </Text>
        <View style={styles.container}>
            <Text style={styles.summaryText}>You’ve spent <Text style={spendProgress > 0.5 ? styles.over : styles.under }>{progressPercentage}</Text> of your monthly spending target
            </Text>
            <ProgressBar progress={spendProgress} width={200} height={10} color={spendProgress > 0.5 ? 'red' : 'green'} unfilledColor={'grey'} borderColor={'grey'}/>
            <Text style={styles.projectionText}>You will likely go <Text style={flag == 'over' ? styles.over : styles.under }>{projectionPercentage}</Text> your target
            </Text>
        </View>
        <Separator/>
        </>
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
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    summaryText: {
        fontSize: 12,
        textAlign: 'center',
        color: 'white',
        marginBottom: 10
    },
    targetTextBold: {
        marginTop: 5,
        fontSize: 9,
        fontStyle: 'italic',
        fontWeight: 'normal',
        textAlign: 'center',
        color: 'white',
        marginBottom: 10
    },
    targetText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'aqua',
    },
    projectionText: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    over: {
        color: 'red'
    },
    under: {
        color: 'lawngreen'
    },
    titleText: {
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
});