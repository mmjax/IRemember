import {
    StyleSheet,
    Text,
    View, ScrollView, Modal, Image, Button,FlatList, Alert, TextInput, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity
  } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { REACT_APP_API_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';



const API_URL = REACT_APP_API_URL;
  
  
function Header_home({ navigation }) {
    const [number, onChangeNumber] = React.useState('');
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
    console.log(userState)
    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Root', { screen: 'Profile' })}>
                <View style={styles.profile}>
                    <Image
                        style={styles.photo}
                        source={userState.photo? { uri: userState.photo }: require('../../logo/ProfileImg.png')
                        }
                    />
                </View>
            </TouchableOpacity>
            
            <IconButton style={styles.btn}  onPress={() => navigation.navigate('AddMemory')} icon={props => <Icon  name="plus" {...props} color="#FEFEFE"/>} />
        </View>                    
        </View>

        
    );

}

const styles = StyleSheet.create({
    container: {
    zIndex:1,
    position: "absolute",
    marginTop:61,
    },

    btn:{
        backgroundColor: '#06648E',
        height: 44,
        width: 44,
        borderRadius: 50,
        marginRight: 16,
    },

    profile:{
        backgroundColor: '#06648E',
        height: 44,
        width: 44,
        borderRadius: 50,
        marginLeft: 16,
    },
    photo:{
        backgroundColor: '#06648E',
        height: 44,
        width: 44,
        borderRadius: 50,
    },
    

    header:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        zIndex:1,
        width: 390,
        alignItems: 'flex-start'
    },

    
        
    
})

export default Header_home