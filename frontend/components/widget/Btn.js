import React, { useRef } from "react";
import { StyleSheet, Text, Button,Pressable, View } from "react-native";
import { PortalProvider } from "@gorhom/portal";

import BottomSheet from "./BottomSheet";


function Btn({ navigation }) {
    const modalRef = useRef(null);

    const onOpen = () => {
      modalRef.current?.open();
    };
  
    const onClose = () => {
      modalRef.current?.close();
    };
  
    return (
      <PortalProvider>
        <View style={styles.container}>
          <BottomSheet navigation={navigation} modalRef={modalRef} onClose={onClose} />
          <Pressable title="Open Modal" color="#1E2022" onTouchMove={onOpen}>
            <View style={styles.line}></View></Pressable>
        </View>
      </PortalProvider>
    );
  };

export default Btn;

const styles = StyleSheet.create({
    container: {
      zIndex:1,
      display: "flex",
      flexDirection: "row",
      width: 390,
      position: "absolute",
      justifyContent: "center",
      marginTop:790,
      backgroundColor: "#F8F8F8",
      height: 100,
      verticalAlign: "middle",
      borderRadius: 25,
    },
    line:{
      width: 60,
      height: 3,
      backgroundColor: "#333333",
      marginTop: 10,
      borderRadius: 10,
    },
  });