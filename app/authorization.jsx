import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  getLocation,
  getDistanceFromLatLonInMeters,
} from "../utils/accessLocation";
import Map from "../components/Map";
import {center, radius} from '../assets/constants/constants'

const { width } = Dimensions.get("window");

const notAuthorized = () => {
  const [showMap, setShowMap] = useState(false);
  const [locationCoordinates, setLocationCoordinates] = useState(null);
  const [alertShown, setAlertShown] = useState(false);
  const [locationNeedsChecking, setLocationNeedsChecking] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await getLocation();
      setLocationCoordinates(result);
      setLocationNeedsChecking(true);
    })();
  }, []);

  const checkLocation = () => {
    if (locationCoordinates) {
      const distance = getDistanceFromLatLonInMeters(
        locationCoordinates?.latitude,
        locationCoordinates?.longitude,
        center.latitude,
        center.longitude
      );

      if (distance > radius && !alertShown) {
        Alert.alert("Error", "You are not in the designated area!", [
          {
            text: "Check Your Location On Map",
            onPress: () => setShowMap(true),
          },
          {
            text: "OK",
            onPress: () => checkLocation(),
          },
        ]);
        setAlertShown(true);
      } else if (distance <= radius) {
        setAlertShown(false);
      }
    }
  };

  const handleCloseMap = () => {
    setShowMap(false);
    setAlertShown(false);
    setLocationNeedsChecking(true);
  };

  useEffect(() => {
    if (locationNeedsChecking) {
      checkLocation();
      setLocationNeedsChecking(false); 
    }
  }, [locationCoordinates, locationNeedsChecking]);

  return (
    <View style={[styles.container]}>
      <LinearGradient
        style={[styles.container]}
        colors={["#DBE6F6", "#C5796D"]}
      >
        <View style={[styles.header]}>
          <TouchableHighlight
            style={[styles.btn]}
            onPress={() => setShowMap(!showMap)}
          >
            <Text style={[styles.btnText]}></Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.body]}></View>
      </LinearGradient>
      {showMap && (
        <Map
          locationCoordinates={locationCoordinates}
          onPress={handleCloseMap}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
    position: "relative",
  },
  text: {
    fontSize: 34,
    fontWeight: "600",
    color: "#fff",
  },
  header: {
    flex: 0.1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: width,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
    borderColor: "rgba(0,0,0,0.4)0",
    borderWidth: 1,
  },
  body: {
    flex: 0.9,
    paddingHorizontal: 10,
    width,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    elevation: 10,
    shadowColor: "rgba(0,0,0,0.4)",
    backgroundColor: "#C5796D",
  },
  btnText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
  },
});

export default notAuthorized;
