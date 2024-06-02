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
  import AddFriends from "../widget/AddFriends";
  import { REACT_APP_API_URL } from '@env';
  import { useIsFocused } from '@react-navigation/native';
  import {ChengeMemory} from '../repo';

const API_URL = REACT_APP_API_URL;


  function EditMemory(props) {
    const {navigation} = props;
    const [memoryState, setMemoryState] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [newDescription, setNewDescription] = useState(null);
    const [newName, setNewName] = useState(null);
    const [newCoordinates, setNewCoordinates] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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

    const handleSubmitParticipants = () => {
      setModalVisible(false);
    }

    const checkResponse = (res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((err) => Promise.reject(err));
      };

    const getMemory = () => {
    return fetch(`${API_URL}/api/memory/${props.route.params}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Token ${auth_token}`,
          },
    })
        .then(checkResponse)
        .then((res) => {
            setMemoryState(res);
            setSelectedDate(new Date(res.date));
          });
    };
    // const ChengeMemory = (data) => {
    // return fetch(`${API_URL}/api/memory/${props.route.params}/`, {
    //     method: 'PATCH',
    //     headers: {
    //     'Content-Type': 'multipart/form-data',
    //     authorization: `Token ${auth_token}`,
    //     },
    //     body: data
    // })
    //     .then(checkResponse)
    // };
    
  
    
  

    const isFocused = useIsFocused();
    useEffect(() => {
        const token = auth_token;
        if (token) {
            getMemory(props.route.params);
        }
        return () => {
            setMemoryState({});
        };
    }, [isFocused]);
    
    const handleSubmit = () => {
        let formData = new FormData();
        if (newDescription) {
            console.log(newDescription)
            formData.append('description', newDescription)
        }
        if (newName) {
            formData.append('name', newName)
        }
        if (selectedDate) {
            const year = selectedDate.getFullYear();
            const month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
            const day = ("0" + selectedDate.getDate()).slice(-2);
            formData.append('date', `${year}-${month}-${day}`)
        }
        if (newCoordinates) {
            formData.append('place_name', newCoordinates)
        }
        ChengeMemory(formData, props.route.params)
        .then((res) => {
          if (res) {
            navigation.navigate('Memory', props.route.params)
          }
        })
        .catch((err) => {
            Alert.alert(err[0][0]);
          console.log(err)
          }
        );
      };

    return (
      <View style={styles.container}>
        <View style={styles.footer}>
          <IconButton
            style={styles.btn}
            onPress={() => navigation.navigate('Memory', props.route.params)}
            icon={(props) => <Icon name="close" {...props} color="#FEFEFE" />}
          />
        </View>
        <View style={styles.column}>
          <TextInput
            style={styles.title}
            defaultValue={memoryState.name}
            onChangeText={setNewName}            
            placeholder="Введите название воспомианния"
            fontSize={18}
            type="text"
            placeholderTextColor="#828282"
            id={1}
          />
           <TextInput
            style={styles.title}
            defaultValue={memoryState.description}
            onChangeText={setNewDescription}
            placeholder="Введите описание"
            fontSize={18}
            type="text"
            placeholderTextColor="#828282"
            id={2}
          />
          <TextInput
            style={styles.title}
            defaultValue={memoryState.place_name}
            onChangeText={setNewCoordinates}
            placeholder="Введите адрес"
            fontSize={18}
            type="text"
            placeholderTextColor="#828282"
            id={3}
          />

          <View style={styles.row}>
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
          <IconButton
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
            icon={(props) => (
              <Icon name="account-plus" {...props} color="#06648E" />
            )}
          />
          </View>
   
         
        </View>



<Pressable style={styles.btnEdit} onPress={() => handleSubmit()}>
          <Text style={styles.btnEdit_text}>Сохранить изменения</Text>
        </Pressable>
  
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
              <AddFriends memoryId={props.route.params} onSave={handleSubmitParticipants}/>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      height: '100%',
      backgroundColor: "#F5F5F5",
    },
    icondate: {
      merginTop: 20,
    },

    column:{
        isplay: "flex",
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 16,
    },

    row:{
        display: "flex",
        flexDirection: 'row',
        width: '100%',
        justifyContent: "space-between"
    },

    btnEdit: {
        position: 'absolute',
        marginTop: 770,
        backgroundColor: "#06648E",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 15,
      },
      btnEdit_text:{
        fontSize: 18,
        color: '#fefefe',
        paddingBottom: 5,
        fontWeight:"500"
      },
  
    title: {
      marginTop: 24,
      width: 358,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#C1C1C1",
      padding: 10,
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
      marginTop: -40,
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
  
  export default EditMemory;
  