import {
    StyleSheet,
    Text,
    View, ScrollView, Image, FlatList, Alert, TextInput, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity
  } from 'react-native';
  import React from 'react';
  import { Stack, IconButton } from "@react-native-material/core";
  import Icon from "@expo/vector-icons/MaterialCommunityIcons";

  


  
  function Memory_card({ memory }) {
    console.log(memory)
    
      return (
          <View style={styles.container} >
            <Text style={styles.title}>{memory.name}</Text>
            <Text style={styles.place}>{memory.place_name}</Text>
            <View style={styles.row}>
                <View style={styles.imgrow}>
                {memory.participants.map(participant => (
                    <Image
                    key={participant.id}
                    style={styles.photo}
                    source={participant.photo ? { uri: participant.photo } : require('../../logo/ProfileImg.png')}
                    />
                ))}
                    {/* <FlatList style={styles.imgrow} data={memory.participants}
                        кey={(item) => item}
                        renderItem={({item}) => (
                            <Image
                                style={styles.photo}
                                source={item.photo ? {uri: item.photo} : require('../../logo/Profile.png')}
                        />
                        )}/> */}
                        
                </View>
            
                <Text style={styles.data}>{memory.date}</Text>
            </View>
            
          </View>
      );
  
  }
  
  const styles = StyleSheet.create({
      container: {
          display: 'flex',
          flexDirection: 'column',
          width:358,
          backgroundColor: '#FFFFFF',
          borderRadius: 25,
          paddingRight: 16,
          paddingLeft: 16,
          paddingVertical: 16,
          shadowColor: '#171717',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        row:{
            display:"flex",
            flexDirection:"row",
            marginTop:16,
            justifyContent: "space-between"
        },
        imgrow:{
            display:"flex",
            flexDirection:"row",
            width:48,
        },
        title:{
            alignSelf:"flex-start",
           color:"#333",
           fontSize: 18,
           fontWeight:"500"
        },
        place:{
            marginTop: 8,
            color:"#A3A6AA",
           fontSize: 14,
           fontWeight:"500",
           alignSelf:"flex-end",
           textAlign:"right"
        },
        data:{
            color:"#A3A6AA",
           fontSize: 14,
           fontWeight:"500",
           alignSelf:"flex-end",
        },
        photo:{
            width: 30,
            height: 30,
            marginRight:-15
        }

        
  })
  
  export default Memory_card