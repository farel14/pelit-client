import React from "react";
import { View, Text, Button, StyleSheet, TextInput, ScrollView } from "react-native"

export default function ExpenseReport({ navigation, route }) {

    return (
        <ScrollView>
            <View style={styles.containerView}>
                <Text>Report</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });