import {
  StyleSheet,
  Text,
  View, ScrollView, Modal, Image, Button, FlatList, Alert, TextInput, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Memory_post from '../widget/Memory_post';
import { REACT_APP_API_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';
import { getMemory, getUserMe } from '../repo';


const API_URL = REACT_APP_API_URL;


function Memory(props) {
    const {navigation} = props;
    const [number, onChangeNumber] = React.useState('');
    const [userState, setUserState] = useState({});
    const [memoryState, setMemoryState] = useState({});

    const checkResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((err) => Promise.reject(err));
    };

    const getUser = () => {
      return fetch(`${API_URL}/api/users/me/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${auth_token}`,
        },
      })
        .then(checkResponse);
    };
    // const getMemory = (id) => {
    //   return fetch(`${API_URL}/api/memory/${id}/`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       authorization: `Token ${auth_token}`,
    //     },
    //   })
    //     .then(checkResponse);
    // };
    const isFocused = useIsFocused();
    useEffect(() => {
      const token = auth_token;
      if (token) {
        getUser().then((res) => setUserState(res));
        getMemory(props.route.params).then((res) => setMemoryState(res.data));
      }
      console.log(memoryState)
    }, [isFocused]);
    return (
        <View style={styles.container}>
            
              <View style={styles.header}>
              <IconButton style={styles.icon_footer} onPress={() => navigation.navigate('Home_page')} icon={props => <Icon  name="arrow-left" {...props} color="#06648E"/>} />
              <Text style={styles.title}>{memoryState.name}</Text>
              {userState.id === memoryState.creator?.id ? (
                <IconButton onPress={() => navigation.navigate('EditMemory', memoryId = memoryState.id )}
                  style={styles.icon_footer}
                  icon={(props) => <Icon name="dots-vertical" {...props} color="#06648E" />}
                />
              ) : null}
              </View>
              <View style={styles.header_column}>
                <Text style={styles.title_min}>{memoryState.place_name}</Text>
                <Text style={styles.title_min}>{memoryState.description}</Text>
                <Text style={styles.title_min}>{memoryState.date}</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
                <FlatList style={styles.list}
                  data={memoryState.posts}
                  кey={(item) => item}
                  renderItem={({item}) => (<Memory_post post={item}/>)
                }
                />
            </ScrollView>
            

            <KeyboardAvoidingView behavior="padding" style={styles.screen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.footer}> 
                      <IconButton style={styles.btn} onPress={() => navigation.navigate('AddMemoryPost', memoryState.id)} icon={props => <Icon  name="plus" {...props} size={36} color="#fff"/>} />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
                
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 844,
        backgroundColor: '#F5F5F5'
    
      },

      header:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 342,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 8,
      },

      title:{
        fontSize: 20,
      },

      title_min:{
        fontSize: 14,
        color: '#A3A6AA',
        marginBottom: 8
      },

      text:{
        width: 342,
        fontSize: 16,
        marginBottom: 24,

      },

      header_column:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      
      members_row:{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,

      },

      img:{
        width: 342,
        height: 219,
        borderRadius: 16,
        marginBottom:24
      },

      img_members:{
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 8,
      },
      name:{
        fontSize: 16,
        marginTop: 12
      },

      btn:{
        width: 45,
        height: 45,
        backgroundColor: "#06648E",
        borderRadius: 28,
        alignSelf: 'center',
        
      },

      btn_text:{
        alignSelf: 'center',
        marginTop: 5,
        fontSize: 16,
        color: '#fff'

      },

      put_txt:{
        fontSize: 16,
        borderColor: '#C2C2C2',
        borderWidth: 1,
        height: 30,
        borderRadius: 10,
        backgroundColor: "#fff",
        width: 294,
        alignContent: 'center',
      },

      footer:{
        position: 'absolute',
            justifyContent: 'center',
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: 390,
            marginTop: -80,
            paddingTop: 8,
            height: 32,
            
            
    
    },

        icon_footer:{
        width: 30,
        height: 30,
        borderRadius: 50,

      },
      
})

export default Memory