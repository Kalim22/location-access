import React from 'react'
import { Dimensions, Modal, StyleSheet, View, TouchableOpacity } from 'react-native';
import Mapview, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {center, radius} from '../assets/constants/constants'
import AntDesign from "@expo/vector-icons/AntDesign";

const {width} = Dimensions.get('window')

const Map = ({onPress, locationCoordinates}) => {
  return (
    <Modal
    style={[styles.container]}
    visible={true}
    transparent={true}
    animationType="slide"
  >
    <View style={[styles.container]}>
      <Mapview
        initialRegion={{
          latitude: locationCoordinates?.latitude,
          longitude: locationCoordinates?.longitude,
          latitudeDelta: 0.9,
          longitudeDelta: 0.9,
        }}
        style={[styles.container]}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: locationCoordinates?.latitude,
            longitude: locationCoordinates?.longitude,
          }}
        />
        <Circle
          radius={radius}
          center={{
            latitude: center.latitude,
            longitude: center.longitude,
          }}
          strokeColor="rgba(0,0,255, 0.7)"
          strokeWidth={2}
          fillColor="rgba(0,0,180, 0.2)"
        />
      </Mapview>
      <TouchableOpacity
        style={[styles.closeBtn]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <AntDesign name="close" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width,
      position: "relative",
    },
    closeBtn: {
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: "#000",
      elevation: 10,
      zIndex: 1,
      position: "absolute",
      bottom: 15,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  

export default Map
