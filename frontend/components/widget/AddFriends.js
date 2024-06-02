import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect }  from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useIsFocused } from '@react-navigation/native';
import { REACT_APP_API_URL } from '@env';

const API_URL = REACT_APP_API_URL;



function AddFriends({memoryId, onSave}) {
  const [memoryData, setMemoryData] = useState({ participants: [] });
  const [friends, setFriends] = useState([])

  const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  };


  const fetchFriendsData = async() => {
    try {
      const response = await fetch(`${API_URL}/api/friends/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${auth_token}`,
        },
      });
      const json = await response.json();
      setFriends(json);
      return json
    }
    catch (error) {
      console.log(error);
      }
  };

  const ChengeMemory = (participants) => {
    return fetch(`${API_URL}/api/memory/${memoryId}/`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${auth_token}`,
        },
        body: JSON.stringify({ participants }),
    })
        .then(checkResponse)
    };

  const handleSubmit = () => {
    ChengeMemory(memoryData.participants)
    .then((res) => {
      if (res) {
        navigation.navigate('Root', { screen: 'Profile' })
      }
    })
    .catch((err) => {
      Alert.alert(err[0][0]);
      }
    );
    onSave();
  };

  const fetchMemoryData = async() => {
    try {
      const response = await fetch(`${API_URL}/api/memory/${memoryId}/for_update`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${auth_token}`,
        },
      });
      const json = await response.json();
      setMemoryData({participants: json.participants });
      return json
    }
    catch (error) {
      console.log(error);
      }
  };


  const handleChange = (id) => {
    let tempParticipants = [...memoryData.participants];

    const index = tempParticipants.indexOf(id);
    if (index !== -1) {
      tempParticipants.splice(index, 1);
    } else {
      tempParticipants.push(id);
    }
    setMemoryData({participants: tempParticipants});
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    const token = auth_token;
    if (token) {
      fetchFriendsData();
      fetchMemoryData();
    }
    
  }, [isFocused]);

  const renderFlatList = (renderData, memoryData) => {
    return (
      <>
      <View>
      <FlatList
        style={styles.container}
        data={renderData}
        renderItem={({ item }) => (
          <View style={{ margin: 0 }}>
            <View style={styles.card}>
              <Text>{item.username}</Text>
              <Text>{memoryData.participants.includes(item.id)}</Text>

              <Pressable onPress={() => handleChange(item.id)}>
                <MaterialCommunityIcons
                  name={memoryData.participants.includes(item.id)? "close-circle" : "plus-circle-outline"}
                  size={28}
                  color="#06648E"
                />
              </Pressable>
            </View>
          </View>
        )}
      />
      </View>
      
    </>
    );
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Выберите участников воспоминания</Text>
      <View style={styles.line}></View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        {renderFlatList(friends, memoryData)}
      </ScrollView>
      <View>
    </View>
    <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.textStyle}>Сохранить</Text>
        </Pressable> 
      </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: 328,
  },
  body: {
    height: 348,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  buttonClose: {
    backgroundColor: "#06648E",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 16,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#333",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    alignSelf: "center",
    marginBottom: 16,
    marginTop: -16,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AddFriends;
