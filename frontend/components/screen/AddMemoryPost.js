import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { REACT_APP_API_URL } from '@env';
import { CreatePost } from "../repo"

const API_URL = REACT_APP_API_URL;

function AddMemoryPost(props) {
  const {navigation} = props;
  const [number, onChangeNumber] = React.useState("");
  const [userData, setUserData] = React.useState({});
  const [imageData, setImageData] = React.useState(null);

  // const checkResponse = (res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return res.json().then((err) => Promise.reject(err));
  // };

  // const CreatePost = (data) => {
  //   return fetch(`${API_URL}/api/post/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       authorization: `Token ${auth_token}`,
  //     },
  //     body: data
  //   })
  //     .then(checkResponse)
  // };

  const handleSubmit = () => {
    let formData = new FormData();
      formData.append('description', userData.description);
      formData.append('memory', props.route.params);
      console.log(imageData.assets[0].uri.replace('file://', ''), imageData.assets[0].type)
      if (imageData){
          formData.append('image', {
          uri: imageData.assets[0].uri.replace('file://', ''),
          type: imageData.assets[0].type,
          name: imageData.assets[0].fileName ? imageData.assets[0].fileName : imageData.assets[0].uri.replace('file://', '')
        })
      }
      console.log(formData)
      CreatePost(formData)
      .then((res) => {
        if (res) {
          navigation.navigate('Memory', props.route.params)
        }
      })
      .catch((err) => {
          if(err.description){
              Alert.alert(err.description[0]);
          }
          if(err.image){
              Alert.alert(err.image[0]);
          }
        console.log(err)
        
        }
    );
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageData(result)
    }
  };

  const onChangeInput = (e, name) => {
    setUserData({
      ...userData,
      [name]: e.nativeEvent.text,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <IconButton
          style={styles.btn}
          onPress={() => navigation.navigate("Memory")}
          icon={(props) => <Icon name="close" {...props} color="#FEFEFE" />}
        />
        <Text style={styles.title}>Новый пост</Text>

        <IconButton
          style={styles.btn}
          onPress={() => handleSubmit()}
          icon={(props) => <Icon name="arrow-up" {...props} color="#FEFEFE" />}
        />
      </View>
      <View style={styles.line}></View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <TextInput
          style={styles.description}
          onChange={e => onChangeInput(e, 'description')}
          placeholder="Введите описание"
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

        {image && <Image source={{ uri: image }} style={styles.image} />}
      </ScrollView>
      <View style={styles.linefooter}></View>

      <View style={styles.footerline}>
        <IconButton
          onPress={pickImage}
          icon={(props) => (
            <Icon name="camera-plus" {...props} color="#06648E" />
          )}
        />
      </View>
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

  title:{
    fontSize: 20,
    marginTop: 5,
    fontWeight:"500",
    color:"#06648E"
  },

  body: {
    marginTop: 25,
    marginBottom: 100,
  },

  linefooter: {
    position: "absolute",
    marginTop: 760,
    height: 1,
    width: "100%",
    backgroundColor: "#333",
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

  line: {
    position: "absolute",
    marginTop: 90,
    height: 1,
    width: "100%",
    backgroundColor: "#333",
    marginBottom: 16,
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
    backgroundColor: "#fff",
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
});

export default AddMemoryPost;
