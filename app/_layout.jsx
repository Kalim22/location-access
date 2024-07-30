import { router, Stack } from "expo-router";
import "react-native-reanimated";
import React, { useState, useEffect } from "react";
import {getLocation, getDistanceFromLatLonInMeters} from '../utils/accessLocation'
import {center, radius} from '../assets/constants/constants'

export default function RootLayout() {

  const [locationCoordinates, setLocationCoordinates] = useState(null);

  useEffect(() => {
    (async() => {
      const result = await getLocation();
      setLocationCoordinates(result)
    })()

  }, []);

  const checkLocation = () => {
    if (locationCoordinates) {
      const distance = getDistanceFromLatLonInMeters(
        locationCoordinates?.latitude,
        locationCoordinates?.longitude,
        center?.latitude,
        center?.longitude,
      );

      if (distance > radius) {
        return router.push('/authorization')
      } 
      return
    }
  }

  useEffect(() => {
    checkLocation()
  }, [locationCoordinates]);

  
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Stack.Screen name="authorization" options={{ headerShown: false }} />
        {/* <Stack.Screen name="showLocation" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
