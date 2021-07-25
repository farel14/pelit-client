import React from "react";
import { View, Text, Image, Button, StyleSheet, TextInput, ScrollView } from "react-native"
import { dateFormatter } from '../helpers/dateFormatter.js'

export default function MyProfile({ navigation, route }) {
    const today = dateFormatter(new Date())

    return (
        <ScrollView contentContainerStyle={styles.pageScrollContainer}>
            <View style={styles.pageViewContainer}>

                <View style={styles.pageTitle}>
                    <View style={styles.userName}>
                        <Text style={styles.pageTitleText}>Hi Galuh!</Text>
                    </View>
                    <View style={styles.date}>
                        <Text style={styles.pageTitleText}>{today}</Text>
                    </View>
                </View>

                <View style={styles.userDetails}>
                    <Image style={styles.userProfilePicture} source={{uri: 'https://ik.imagekit.io/77pzczg37zw/Alifani_G.jpg?updatedAt=1625136098428'}}/>

                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pageScrollContainer: {
        flexGrow: 1,
    },
    pageViewContainer: {
        flexGrow: 1,
        paddingHorizontal: 10,
        backgroundColor: "#04009A",
        borderWidth: 5,
        borderColor: 'white'
    },
    pageTitle: {
      flexDirection: "row",
      justifyContent: "space-between",
      color: "white",
      alignItems: "center",
      borderWidth: 5,
      borderColor: 'white'
    },
    pageTitleText: {
        borderWidth: 5,
        borderColor: 'green',
        color: "white",
        marginTop: 15,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    userProfilePicture: {
        width: 100,
        height: 200,
        resizeMode: 'contain'
    }
  });