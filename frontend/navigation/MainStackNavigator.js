import * as React from 'react'
import {useState, useEffect} from 'react'
import { StyleSheet, Text, Image, View,Button,Pressable, Alert, SafeAreaView, TouchableOpacity} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Memory from '../components/screen/Memory'
import Sign_in from '../components/screen/Sign_in'
import Sign_up from '../components/screen/Sign_up'
import Home_page from '../components/screen/Home_page';
import Profile from '../components/screen/Profile';
import EditProfile from '../components/screen/EditProfile';
import Memory_list from '../components/screen/Memory_list';
import Memory_card from '../components/widget/Memory_card';
import Memory_post from '../components/widget/Memory_post';
import Header_home from '../components/widget/Header_home';
import Friends_page from "../components/screen/Friends_page"
import { Icon } from '@react-native-material/core';
import Btn from '../components/widget/Btn';
import AddMemory from '../components/screen/AddMemory';
import AddFriends from '../components/widget/AddFriends';
import AddMemoryPost from '../components/screen/AddMemoryPost';
import EditMemory from '../components/screen/EditMemory';
import Map from '../components/screen/Map';
import { REACT_APP_API_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';


const API_URL = REACT_APP_API_URL;


const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();



function Root() {
  const [number, onChangeNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userState, setUserState] = useState({});

    const checkResponse = (res) => {
        if (res.ok) {
        return res.json();
        }
        return res.json().then((err) => Promise.reject(err));
    };

    const isFocused = useIsFocused();
    useEffect(() => {
        const token = auth_token;
        console.log(auth_token)
        if (token) {
        getUser();
        }
    }, [isFocused]);

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
  const navigation = useNavigation()
  console.log(userState.photo)
  
  return (
    
    <Drawer.Navigator initialRouteName="Home_page" >
        <Drawer.Screen name="Home_page" component={Home_page} options={{title: 'Главная', headerShown: false, }} screenOptions={{headerShown: false,
    headerLeft: () => <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Image
                        style={styles.photo}
                        source={userState.photo ? { uri: userState.photo } : require('../logo/Profile.png')
                        }
                    />
    </TouchableOpacity> }}/>
        <Drawer.Screen name="Profile" component={Profile} options={{title: 'Профиль',
          headerShown: false,
          headerLeft: () => null,}}/>
        <Drawer.Screen name="EditProfile" component={EditProfile} options={{title: 'Изменение профиля',
          headerShown: false,
          headerLeft: () => null,}}/>
        <Drawer.Screen name="Memory_list" component={Memory_list} options={{title: 'Мои воспомиания',
          headerShown: false,
          headerLeft: () => null,}}/>
        <Drawer.Screen name="Friends_page" component={Friends_page} options={{title: 'Друзья',
          headerShown: false,
          headerLeft: () => null,}}/>
      </Drawer.Navigator>
  );
}

function MainStackNavigator() {

  
  return (
    <NavigationContainer>
    <Stack.Navigator>



    <Stack.Screen
          name='Sign_in'
          component={Sign_in}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
        />
    <Stack.Screen
          name='Sign_up'
          component={Sign_up}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
        />

    <Stack.Screen
          name='Root'
          component={Root}
          options={{ headerShown: false }}
        />

    <Stack.Screen
          name='Btn'
          component={Btn}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
        />


    <Stack.Screen
          name='Memory'
          component={Memory}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
        />
    
<Stack.Screen
          name='Memory_list'
          component={Memory_list}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
        />
        <Stack.Screen
          name='Memory_card'
          component={Memory_card}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
        />

        <Stack.Screen
          name='Memory_post'
          component={Memory_post}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
        />
        <Stack.Screen
          name='Header_home'
          component={Header_home}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
        />
        <Stack.Screen
          name='AddMemory'
          component={AddMemory}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
        />

        <Stack.Screen
          name='AddFriends'
          component={AddFriends}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
        />

        <Stack.Screen
          name='AddMemoryPost'
          component={AddMemoryPost}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
        />
        <Stack.Screen
          name='EditMemory'
          component={EditMemory}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
        />
        <Stack.Screen
          name='Map'
          component={Map}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
        />       
      
    </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({

  drawer:{
    width: 257,
  }
})

export default MainStackNavigator