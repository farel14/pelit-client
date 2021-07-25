import React, {useState} from "react";
import { Text, View, Image, StyleSheet, TextInput, ScrollView, Pressable, Button } from "react-native"
import ProgressBar from 'react-native-progress/Bar'

const Separator = () => (
    <View style={styles.separator} />
);

export default function TargetProgress({navigation, route, activeTarget, spending, projection}) {
    const spendProgress = spending / activeTarget.monthlyTarget
    const progressPercentage = `${spending / activeTarget.monthlyTarget * 100}%`
    let projectionPercentage = 0
    let flag = 'under'

        if (activeTarget.monthlyTarget > projection) {
            flag = 'under'
            projectionPercentage = `${Math.round(100-(projection / activeTarget.monthlyTarget * 100))}% under`
        } else {
            flag = 'over'
            projectionPercentage = `${Math.round((((projection / activeTarget.monthlyTarget) - 1) * 100))}% over`
        }
    
    return (
        <>
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
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 20
    },
    summaryText: {
        fontSize: 12,
        textAlign: 'center',
        color: 'white',
        marginBottom: 10
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
    }
});