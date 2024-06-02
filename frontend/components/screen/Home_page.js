import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView from "react-native-maps";
import {Marker} from 'react-native-maps';
import Header_home from "../widget/Header_home";
import Btn from "../widget/Btn";
import { useIsFocused } from '@react-navigation/native';
import { REACT_APP_API_URL } from '@env';
import { MemoryListForMap } from "../repo";

const API_URL = REACT_APP_API_URL;


function Home_page({ navigation }) {
  const [number, onChangeNumber] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [memoryList, setMemoryList] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const fetchData = async() => {
    try {
      const response = await MemoryListForMap()
      // fetch(`${API_URL}/api/memory/cart/`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     authorization: `Token ${auth_token}`,
      //   },
      // });
      const json = await response.json();
      console.log(json)
      setMemoryList(json);
    }
    catch (error) {
      console.log(error);
      }
  };

  const isFocused = useIsFocused();
      useEffect(() => {
        const token = auth_token;
        if (token) {
          fetchData();
        }
    }, [isFocused]);


  const renderMarkers = () => {
    console.log(memoryList)
    return memoryList.map((marker, index) => (
      <Marker pinColor="#06648E" onPress={() => navigation.navigate("Memory", marker.id )}
      
        key={index}
        coordinate={{
          latitude: marker.coordinates.split(',')[0],
          longitude: marker.coordinates.split(',')[1]
        }}
      >
      </Marker>
      
    ));
  };
  
  return (
    <View style={styles.container}>
      <Header_home navigation={navigation} style={styles.header} />

 
      <MapView
      style={styles.map}
      initialRegion={{
        latitude: 55.755863, 
        longitude: 37.620447,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0921,
      }}
      >
        {renderMarkers()}
    </MapView>
      {/* <TouchableOpacity onPress={() => navigation.navigate("Memory")}>
        <Image style={styles.photo} source={require("../../logo/mark.png")} />
      </TouchableOpacity>

      <Btn navigation={navigation}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  map: {
    zIndex: 0,
    width: "100%",
    height: "100%",
  },

  photo: {
    marginTop: -300,
    marginLeft: 160,
  },
  btn: {
    backgroundColor: "#06648E",
    height: 44,
    width: 44,
    borderRadius: 50,
    marginRight: 16,
  },

  profile: {
    backgroundColor: "#06648E",
    height: 44,
    width: 44,
    borderRadius: 50,
    marginLeft: 16,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
    marginTop: 200,
    width: 390,
    alignItems: "flex-start",
  },
  stretch: {
    position: "absolute",
    zIndex: 0,
  },
  centeredView: {},
  icon: {
    marginHorizontal: 6,
  },
});

export default Home_page;
