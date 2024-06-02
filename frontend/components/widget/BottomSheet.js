import React from "react";
import { Dimensions, ScrollView, TouchableOpacity, View, StyleSheet, Text, Button } from "react-native";
import { Portal } from "@gorhom/portal";
import { Modalize } from "react-native-modalize";
import Memory_card from "./Memory_card";

const { height } = Dimensions.get("screen");
const modalHeight = height * 0.723;


const BottomSheet = ({ modalRef, navigation}) => {
  return (
    <Portal>
      <Modalize style={styles.content} ref={modalRef} modalHeight={modalHeight}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <TouchableOpacity navigation={navigation} style={styles.card} onPress={() => navigation.navigate('Memory')}>
                <Memory_card navigation={navigation}/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Memory')}>
                <Memory_card navigation={navigation}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Memory')}>
                <Memory_card navigation={navigation}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Memory')}>
                <Memory_card navigation={navigation}/>
              </TouchableOpacity>
              </ScrollView>
      </Modalize>
    </Portal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: modalHeight,
    width: 390,
    paddingHorizontal: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 45,
  },
  body:{
    paddingBottom: 50,
  },

  card:{
    alignSelf: "center",
    marginTop:16
  },


  text: {
    fontSize: 48,
    fontWeight: "600",
    letterSpacing: 48 * 0.02,
    alignSelf: "center",
    color: "#C9D6DF",
  },
});