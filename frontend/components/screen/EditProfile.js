import React, { useState, useEffect } from 'react';
import { Text, Image, View, Pressable, TextInput, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IconButton } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { REACT_APP_API_URL } from '@env';
import * as ImagePicker from "expo-image-picker";
import { getUserMe, ChengeUserMe } from '../repo';

const API_URL = REACT_APP_API_URL;

function Profile({ navigation }) {
  const [userState, setUserState] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newFirst_name, setNewFirst_name] = useState('');
  const [newLast_name, setNewLast_name] = useState('');



  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result);
    }
  };

  const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  };

  // const checkUpdateResponse = (res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return res.json().then((err) => Promise.reject(err));
  // };

  const getUser = () => {
    return fetch(`${API_URL}/api/users/me/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${auth_token}`,
      },
    })
      .then(checkResponse)      
      .then((res) => setUserState(res));
  };

  // const ChengeUser = (data) => {
  //   return fetch(`${API_URL}/api/users/${userState.id}/`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       authorization: `Token ${auth_token}`,
  //     },
  //     body: data
  //   })
  //     .then(checkResponse)
  // };


  const isFocused = useIsFocused();
  useEffect(() => {
    const token = auth_token;
    if (token) {
      getUser();
    }
  }, [isFocused]);


  const handleSubmit = () => {
    let formData = new FormData();
    if (newUsername) {
        formData.append('username', newUsername)
    }
    if (newEmail) {
        formData.append('email', newEmail)
    }
    if (newFirst_name) {
        formData.append('first_name', newFirst_name)
    }
    if (newLast_name) {
        formData.append('last_name', newLast_name)
    }
    if (image){
        formData.append('photo', {
        uri: image.assets[0].uri.replace('file://', ''),
        type: image.assets[0].type,
        name: image.assets[0].fileName ? image.assets[0].fileName : image.assets[0].uri.replace('file://', '')
    })
    }
    ChengeUserMe(formData)
    .then((res) => {
      if (res) {
        navigation.navigate('Root', { screen: 'Profile' })
      }
    })
    .catch((err) => {
        if(err.username){
            Alert.alert(err.username[0]);
        }
        if(err.email){
            Alert.alert(err.email[0]);
        }
      console.log(err)
      
      }
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.rec_one}>
        <View style={styles.header}>
          <View style={styles.header_row}>
            <IconButton
              style={styles.icon_header}
              onPress={() => navigation.navigate('Profile')}
              icon={(props) => (
                <Icon name="arrow-left" {...props} color="#FEFEFE" />
              )}
            />
            <Text style={styles.title} >Редактировать профиль</Text>
          </View>
        </View>
        <View style={styles.img}>

          <Image
            style={styles.photo}
            source={image ? { uri: image.assets[0].uri } : (userState.photo? { uri: userState.photo }: require('../../logo/ProfileImg.png'))}
          />
        </View>
            <Pressable style={styles.cambtn} onPress={pickImage}>
                <Text style={styles.cambtnText} >Изменить фото</Text>
            </Pressable>
      </View>



      <KeyboardAvoidingView behavior="padding">
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <TextInput
          style={styles.input}
          defaultValue={userState.username}
          onChangeText={setNewUsername}
          placeholder="Логин"
        />
        <TextInput
          style={styles.input}
          defaultValue={userState.email}
          onChangeText={setNewEmail}
          placeholder="Адрес электронной почты"
        />
        <TextInput
          style={styles.input}
          defaultValue={userState.first_name}
          onChangeText={setNewFirst_name}
          placeholder="Имя"
        />
        <TextInput
          style={styles.input}
          defaultValue={userState.last_name}
          onChangeText={setNewLast_name}
          placeholder="Фамилия"
        />
          </View>

        </TouchableWithoutFeedback>       
        
    </KeyboardAvoidingView>
    <Pressable style={styles.btn} onPress={() => handleSubmit()}>
          <Text style={styles.btn_text}>Сохранить изменения</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F5F3F5',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }, 
      body:{
        zIndex: 1,
        
      },

      cambtn:{
        marginTop: 8,
        alignSelf: "center",

      },

      cambtnText:{
        color: "#fefefe"
      },
      header:{
        
        marginTop: 50,
        marginLeft: 14,
        verticalAlign: 'middle'
      },
    
      header_row:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 30
        
      },
    
      icon_header:{
        width: 40,
        height: 40,
        marginTop: -5,
    
      },
    
      title:{
        fontSize: 20,
        fontWeight: 600,
        color: '#F2FEFE',
      },
      rec_one:{
        height: 332,
        width:393,
        marginTop: 0,
        backgroundColor:"#06648E",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      },
      btn_exit:{
        marginTop: 283,
        alignSelf: "center",
    
      },
    
      btn_text_exit:{
        fontSize: 18,
        color:"#A3A6AA"
      },
    
      rec_t:{
        alignSelf: 'center',
        display: 'flex',
        alignContent: 'flex-start',
        height: 75,
        width: 287,
        marginTop: 47,
    
      },
      img:{
        height: 200,
        width: 200,
        borderRadius: 100,
        backgroundColor: "#fff",
        marginTop: 6,
        alignSelf: "center"
      },
      photo:{
        height: 200,
        width: 200,
        borderRadius: 100,
        backgroundColor: "#fff",
        alignSelf: "center"
      },
    
      login:{
        marginTop: 17,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 20,
        lineHeight: 31,
        marginBottom:8,
        color:"#FEFEFE",
        alignSelf: "center"
      },
      email:{
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 16,
        color: '#A3A6AA',
        alignSelf: "center",
        marginTop:-10
      },
    
      icon:{
        alignSelf: 'center',
        marginLeft: 2,
        marginBottom: 2,
        transform: [{ rotate: '-90deg'}]
    },
      btn: {
        position: "absolute",
        marginTop: 770,
        backgroundColor: "#06648E",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 15,
      },
      btn_text:{
        fontSize: 18,
        color: '#fefefe',
        paddingBottom: 5,
        fontWeight:"500"
      },
      input: {
        width: 342,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#C1C1C1",
        padding: 10,
        marginTop: 20,
      },
      
});

export default Profile;