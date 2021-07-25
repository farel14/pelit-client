import React, {useState} from "react";
import { View, Image, StyleSheet, TextInput, ScrollView, Pressable, Button, Text } from "react-native"
import { dateFormatter, monthFormatter } from '../helpers/dateFormatter.js'
import NumberFormat from 'react-number-format'
import TargetProgress from "./TargetProgress.jsx"
import { useSelector } from 'react-redux'

const Separator = () => (
    <View style={styles.separator} />
);

export default function MyProfile({ navigation, route, spending }) {
    const select = useSelector    
    const today = dateFormatter(new Date())
    const month = monthFormatter(new Date())
    let dateToday = new Date()
    const dateNum = dateToday.getDate()
    const projection = spending/dateNum * 31
    const [index, setIndex] = React.useState(0);
    const activeTarget = select(state => state.activeTarget)

    return (
        <ScrollView>
            {
                activeTarget ? 
                <TargetProgress activeTarget={activeTarget} spending={spending} projection={projection}/>
                :
                null
            }

            <View style={styles.container}>
                <Text style={styles.summaryText}>Total spend This Month</Text>
                <NumberFormat value={spending} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'Rp '} renderText={formattedValue => <Text style={styles.summaryAmount}>{formattedValue}</Text>} />
                <View style={{marginBottom: 40}}/>
                <Text style={styles.summaryText}>Your spend projection until end of {month}</Text>
                <NumberFormat value={projection} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'Rp '} renderText={formattedValue => <Text style={styles.summaryAmount}>{formattedValue}</Text>} />
                <View style={{marginBottom: 40}}/>
                {
                    activeTarget ? 
                    null
                    :
                    <Pressable
                        style={[styles.button, styles.shadowProp]}>
                        <Text style={styles.buttonText}>Set spending target and earn badges!
                        </Text>
                    </Pressable>                  
                }

            </View>
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