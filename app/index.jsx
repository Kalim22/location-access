import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Map from "../components/Map";
import { useEffect, useState } from "react";
import { getLocation } from "@/utils/accessLocation";
import CustomButton from "../components/CustomButton";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [showMap, setShowMap] = useState(false);
  const [locationCoordinates, setLocationCoordinates] = useState(null);

  useEffect(() => {
    (async () => {
      const coordinates = await getLocation();
      setLocationCoordinates(coordinates);
    })();
  }, []);

  return (
    <View style={[styles.container]}>
      <LinearGradient
        style={[styles.container]}
        colors={["#DBE6F6", "#C5796D"]}
      >
        <Text style={[styles.text]}>Authroziation Access</Text>
        <CustomButton title={"Open Map"} onPress={() => setShowMap(true)} />
      </LinearGradient>
      {showMap && (
        <Map
          locationCoordinates={locationCoordinates}
          onPress={() => setShowMap(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
  },
  text: {
    fontSize: 34,
    fontWeight: "600",
    color: "#fff",
  },
});
