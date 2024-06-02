import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import AddFriends from "../widget/AddFriendsToNewMemory";
import { useIsFocused } from '@react-navigation/native';
import { Button } from "react-native-paper";
import { REACT_APP_API_URL } from '@env';
import { CreateMemory } from '../repo';


function AddMemory({ navigation, route }) {
  const [coordinates, setCoordinate] = React.useState("")
  const [number, onChangeNumber] = React.useState("");
  const [userData, setUserData] = React.useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [participants, setParticipants] = useState([])
  const [markerCoordinate, setMarkerCoordinate] = useState("")


  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleSubmitParticipants = (selectedParticipants) => {
    setParticipants(selectedParticipants);
    setModalVisible(!modalVisible);
  }

  // const checkResponse = (res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return res.json().then((err) => Promise.reject(err));
  // };

  // const updateMemory = (data) => {
  //   console.log(data.id)
  //   const response = fetch(`${API_URL}/api/memory/11/`, {
  //     method: 'PATCH',
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Token ${auth_token}`,
  //       },
  //       body: JSON.stringify({participants}),
  //       })
  //       console.log(response)
  //       };
    

  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    let formData = new FormData();
    if (userData.name){
      formData.append('name', userData.name)
    }
    if (selectedDate){
      const year = selectedDate.getFullYear();
      const month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
      const day = ("0" + selectedDate.getDate()).slice(-2);
      formData.append('date', `${year}-${month}-${day}`)
    }
    if (coordinates){
      formData.append('coordinates', `${coordinates.latitude},${coordinates.longitude}`)
    }
    if (userData.description){
      formData.append('description', userData.description)
    }
    if (userData.place_name){
      formData.append('place_name', userData.place_name)
    }
    participants.forEach(participant => {
      formData.append('participants', participant);
    });
    CreateMemory(formData)
    .then(({status, data}) => {
      if (data) {
        navigation.navigate('Memory', data.id)
      }
    })
    .catch(({status, errorMessage}) => {
      console.log(errorMessage)
      if (errorMessage.coordinates){
        Alert.alert(`Координаты: ${errorMessage.coordinates[0]}`);
      }
      if (errorMessage.name){
        Alert.alert(`Название: ${errorMessage.name[0]}`);
      }
      if (errorMessage.description){
        Alert.alert(`Описани: ${errorMessage.description[0]}`);
      }
      if (errorMessage.place_name){
        Alert.alert(`Название места: ${errorMessage.place_name[0]}`);
      }
      }
    );
  };

  const [modalVisible, setModalVisible] = useState(false);

  const onChangeInput = (e, name) => {
    setUserData({
      ...userData,
      [name]: e.nativeEvent.text,
    });
  };

  const isFocused = useIsFocused();
      useEffect(() => {
        if (route.params) {
          setCoordinate(route.params.markerCoordinate);
        }
    }, [route, isFocused]);

  console.log()

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <IconButton
          style={styles.btn}
          onPress={() => navigation.navigate("Home_page")}
          icon={(props) => <Icon name="close" {...props} color="#FEFEFE" />}
        />
        <IconButton
          style={styles.btn}
          onPress={() => handleSubmit()}
          icon={(props) => <Icon name="arrow-up" {...props} color="#FEFEFE" />}
        />
      </View>
      <View style={styles.header_column}>
        <TextInput
          style={styles.title}
          onChange={(e) => onChangeInput(e, 'name')}
          placeholder="Введите название воспомианния"
          fontSize={18}
          type="text"
          placeholderTextColor="#828282"
          id={1}
        />
        <TextInput
          style={styles.title}
          onChange={(e) => onChangeInput(e, 'place_name')}
          placeholder="Введите название места"
          fontSize={18}
          type="text"
          placeholderTextColor="#828282"
          id={2}
        />
        
        <Pressable style={styles.bbb} onPress={() => navigation.navigate('Map', {coordinates})}>
            <Text style={styles.bbb_txt}>Выбрать место на карте</Text>
        </Pressable>

        <TouchableOpacity
          onPress={showDatePicker}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "normal" }}>
            {selectedDate
              ? selectedDate.toLocaleDateString()
              : "No date selected"}
          </Text>
          <IconButton
            style={styles.icondate}
            onPress={showDatePicker}
            icon={(props) => (
              <Icon name="calendar" {...props} color="#06648E" />
            )}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.description}
          onChange={(e) => onChangeInput(e, 'description')}
          placeholder="Введите описание воспоминания"
          fontSize={18}
          editable
          returnKeyType="done"
          multiline={true}
          blurOnSubmit={true}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          type="text"
          placeholderTextColor="#828282"
          id={2}
        />

        <View>
          <DateTimePickerModal
            date={selectedDate}
            isVisible={datePickerVisible}
            mode="date"
            display="inline"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </View>

      <View style={styles.footerline}>
        <IconButton
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
          icon={(props) => (
            <Icon name="account-plus" {...props} color="#06648E" />
          )}
        />

        
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
            <AddFriends participants={participants} onSave={handleSubmitParticipants}/>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 844,
    backgroundColor: "#F5F5F5",
  },
  icondate: {
    merginTop: 20,
  },

  bbb: {
    backgroundColor: "#06648E",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 15,
    marginTop: 24,

  },
  bbb_txt:{
    fontSize: 14,
    color: "#fefefe"
  },

  title: {
    marginTop: 16,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#333",
    marginBottom: 16,
  },
  linefooter: {
    position: "absolute",
    marginTop: 760,
    height: 1,
    width: "100%",
    backgroundColor: "#333",
  },

  modalView: {
    marginTop: 200,
    marginHorizontal: 31,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {},
  buttonClose: {
    backgroundColor: "#06648E",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    width: 342,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C1C1C1",
    padding: 10,
  },

  image: {
    width: 342,
    height: 219,
    borderRadius: 16,
    marginTop: 16,
  },

  header_column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  footerline: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    width: 390,
    height: 85,
    paddingHorizontal: 24,
    marginTop: 760,
    justifyContent: "flex-end",
    backgroundColor: "#fff"
  },

  btn: {
    width: 30,
    height: 30,
    backgroundColor: "#06648E",
    borderRadius: 28,
    alignSelf: "center",
  },

  footer: {
    marginTop: 50,
    flexDirection: "row",
    width: 340,
    justifyContent: 'space-between',
  },

  icon_footer: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
});

export default AddMemory;
