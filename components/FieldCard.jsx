import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import ModalItem from "./ModalItem";
import { fetchDeleteTransaction } from "../store/actionsFaisal";
import { useDispatch } from "react-redux";

export default function FieldCard({ item, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  function handleEditItem() {
    setModalVisible(!modalVisible);
    navigation.navigate("EditExpense");
  }

  function handleDeleteItem() {
    setModalVisible(!modalVisible);
    dispatch(fetchDeleteTransaction(item.id));
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: 200,
          }}
        >
          <Text style={styles.simbolListCard}>-</Text>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textListCard}>{item.category}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textListCard}>{item.amount}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ModalItem item={item} />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonEdit]}
                // onPress={() => setModalVisible(!modalVisible)}
                // onPress={() => )}
                onPress={handleEditItem}
              >
                <Text style={styles.textButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={handleDeleteItem}
                // onPress={() => navigation.navigate("MyProfile")}
              >
                <Text style={styles.textButton}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonBack]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textButton}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  simbolListCard: {
    fontSize: 17,
    marginLeft: 20,
  },
  textListCard: {
    fontSize: 15,
    paddingHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 200,
  },
  button: {
    marginTop: 15,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
    width: 70,
  },
  buttonEdit: {
    backgroundColor: "green",
  },
  buttonDelete: {
    backgroundColor: "red",
  },
  buttonBack: {
    backgroundColor: "black",
  },
  textButton: {
    color: "white",
    textAlign: "center",
  },
});
