import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map({ navigation, route }) {
    const {coordinates} = route.params
  const [markerCoordinate, setMarkerCoordinate] = useState(coordinates || null);
  console.log(coordinates)

  const handleLongPress = ({ nativeEvent }) => {
    const { coordinate } = nativeEvent;
    setMarkerCoordinate(coordinate);
  };

  const handleMarkerDrag = (e) => {
    setMarkerCoordinate(e.nativeEvent.coordinate);
  };


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
            latitude: markerCoordinate!==null ? markerCoordinate.latitude : 55.755863,
            longitude: markerCoordinate!==null ? markerCoordinate.longitude : 37.620447,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0921,
        }}
        onLongPress={handleLongPress}
      >
        {markerCoordinate && (
          <Marker pinColor="#06648E"
            coordinate={markerCoordinate}
            draggable
            onDragEnd={handleMarkerDrag}
          />
        )}
      </MapView>

<View style={styles.btb_row}>
    <Pressable style={styles.bbb} onPress={() => navigation.navigate('AddMemory')}>
        <Text style={styles.bbb_txt}>Отмена</Text>
    </Pressable>
    <Pressable style={styles.bbb} onPress={() => navigation.navigate('AddMemory', {markerCoordinate})}>
        <Text style={styles.bbb_txt}>Добавить</Text>
    </Pressable>
</View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  btb_row:
  {
    position: "absolute",
    alignSelf:"center",
    display: "flex",
    flexDirection: "row",
    marginTop: 65,
    width: "100%",
    justifyContent:"space-between",
    paddingHorizontal: 24,


  },
  map: {
    height: "100%",
    width: "100%",
  },
  bbb: {
    backgroundColor: "#06648E",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 15,

  },
  bbb_txt:{
    fontSize: 14,
    color: "#fefefe"
  },
});

export default Map;