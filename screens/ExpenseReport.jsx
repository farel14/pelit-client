import React, {useState, useEffect} from "react";
import { dateFormatter, monthYearFormatter } from '../helpers/dateFormatter.js'
import { View, Text, Button, StyleSheet, TextInput, ScrollView, Dimensions, Pressable } from "react-native"
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import DateTimePicker from '@react-native-community/datetimepicker';
import { monthList } from "../helpers/dateBetween.js";

const Separator = () => (
    <View style={styles.separator} />
);

export default function ExpenseReport({ navigation, route }) {
    let month = new Date().getMonth() + 1
    let endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

    const screenWidth = Dimensions.get("window").width;
    const [dateEnd, setDateEnd] = useState(new Date(endOfMonth));
    const [dateStart, setDateStart] = useState(new Date(new Date(endOfMonth).setDate(new Date(endOfMonth).getDate()-180)));
    const [modeStart, setModeStart] = useState('date');
    const [modeEnd, setModeEnd] = useState('date');
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [start, setStart] = useState(monthYearFormatter(dateStart))
    const [end, setEnd] = useState(monthYearFormatter(dateEnd))
    const [monthArr, setMonthArr] = useState(["Feb", "Mar", "Apr", "May", "Jun", "Jul"])
    const [expenses, setExpenses] = useState([])
    const [income, setIncome] = useState([])
    // const [netIncome, setNetIncome] = useState([])
    let monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];

    useEffect(() => {
        fetch(`https://pelit-app.herokuapp.com/transactions/between/${dateStart}/${dateEnd}/11/Expense`)
        .then(response => response.json())
        .then(data => {
            let group = [];
            let flag = true;
            data.data.forEach((ele) => {
            if (group.length > 0) {
                for (let i = 0; i < group.length; i++) {
                    if (group[i].month == monthNames[ele.month - 1]) {
                        flag = true;
                        group[i].expense += ele.amount;
                    } else {
                        flag = false;
                    }
                }
            } else {
                flag = false;
            }

            if (flag == false) {
                group.push({
                month: monthNames[ele.month - 1],
                expense: ele.amount
                });
            }
            return ele;
            });

            let monthExp = []
            for (let i = 0; i < monthArr.length; i++) {
                let flag = false
                let expense;
                for (let j = 0; j < group.length; j++) {
                    if (monthArr[i] == group[j].month) {
                        flag = true
                        expense = group[j].expense
                    }
                }
                if (flag == true) {
                    monthExp.push((expense * - 1)/1000)
                } else {
                    monthExp.push(0)
                }
            }

            setExpenses(monthExp)
        })
        .catch(err => {
            console.log('error fetch expense data', err)
        })

        fetch(`https://pelit-app.herokuapp.com/transactions/between/${dateStart}/${dateEnd}/11/Income`)
        .then(response => response.json())
        .then(data => {
            let group = [];
            let flag = true;
            data.data.forEach((ele) => {
            if (group.length > 0) {
                for (let i = 0; i < group.length; i++) {
                    if (group[i].month == monthNames[ele.month - 1]) {
                        flag = true;
                        group[i].income += ele.amount;
                    } else {
                        flag = false;
                    }
                }
          } else {
            flag = false;
          }

          if (flag == false) {
            group.push({
              month: monthNames[ele.month - 1],
              income: ele.amount
            });
          }
          return ele;
        });

        let monthInc = []
        for (let i = 0; i < monthArr.length; i++) {
            let flag = false
            let income;
            for (let j = 0; j < group.length; j++) {
                if (monthArr[i] == group[j].month) {
                    flag = true
                    income = group[j].income
                }
            }
            if (flag == true) {
                monthInc.push(income/1000)
            } else {
                monthInc.push(0)
            }
        }

        setIncome(monthInc)
        })
        .catch(err => {
            console.log('error fetch expense data', err)
        })

    }, [monthArr])

    useEffect(() => {
        setMonthArr(monthList(start,end))
    }, [start, end])

    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowStart(Platform.OS === 'Android')
        setDateStart(currentDate);
        setStart(monthYearFormatter(currentDate))
    };

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowEnd(Platform.OS === 'Android')
        setDateEnd(currentDate);
        setEnd(monthYearFormatter(currentDate))
    };

    const showModeStart = (currentMode) => {
        setShowStart(true);
        setModeStart(currentMode);
    };

    const showModeEnd = (currentMode) => {
        setShowEnd(true);
        setModeEnd(currentMode);
    };
    
    const showDatepickerStart = () => {
        showModeStart('date');
    };

    const showDatepickerEnd = () => {
        showModeEnd('date');
    };

    console.log(expenses)
    console.log(income)
    console.log(monthArr)

    return (
        // <ScrollView contentContainerStyle={styles.pageScrollContainer}>
            <View style={styles.pageViewContainer}>
            <View style={{alignItems: 'center'}}>
                <Text style={{marginTop: 30, color:'white'}}>From {start} to {end}</Text>
                <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Pressable
                        style={styles.seeBadges}
                        onPress={showDatepickerStart}>
                        <Text style={styles.seeBadgesText}>Change Start date</Text>
                    </Pressable>
                    <Pressable
                        style={styles.seeBadges}
                        onPress={showDatepickerEnd}>
                        <Text style={styles.seeBadgesText}>Change End date</Text>
                    </Pressable>
                </View>
                {showStart && (
                    <DateTimePicker
                    testID="dateTimePickerStart"
                    value={dateStart}
                    mode={modeStart}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeStart}
                    />
                )}
                {showEnd && (
                    <DateTimePicker
                    testID="dateTimePickerEnd"
                    value={dateEnd}
                    mode={modeEnd}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeEnd}
                    />
                )}
            </View>
                
                <View style={{marginTop: 20}}>
                <Text style={{color:'white'}}>Monthly Expense</Text>
                {
                    expenses.length > 0 ?
                    <LineChart
                    data={{
                    labels: monthArr,
                    datasets: [
                        {
                        data: expenses
                        }
                    ]
                    }}
                    width={screenWidth * 0.9} // from react-native
                    height={200}
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16
                    }}
                    />
                    :
                    null
                }
                </View>

                </View>
        // </ScrollView>
    )
}

const styles = StyleSheet.create({
    pageScrollContainer: {
        flexGrow: 1,
    },
    pageViewContainer: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#04009A",
    },
    separator: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },  
    seeBadges: {
        backgroundColor: "white",
        marginHorizontal: 5,
        padding: 3,
        borderRadius: 15,    
        alignItems: 'center'
    },
    seeBadgesText: {
        alignItems: 'center',
        fontSize: 9,
        color: 'black'
    },
  });