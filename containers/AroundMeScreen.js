import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Location from "expo-location";

export default function AroundMeScreen(props) {
  const [coords, setCoords] = useState();
  const [data, setData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const obj = {
          latitude: 48.866669,
          longitude: 2.33333,
        };
        setCoords(obj);
        try {
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${obj.latitude}&longitude=${obj.longitude}`
          );
          setData(response.data);
          const getMarkers = response.data.map((appt, index) => {
            return { location: appt.location, id: appt._id };
          });
          setMarkers(getMarkers);
        } catch (error) {
          console.log(error.response.data.error);
        }
      } else {
        setError(true);
        const obj = {
          latitude: 48.866669,
          longitude: 2.33333,
        };
        setCoords(obj);
        try {
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms`
          );
          setData(response.data);
          const getMarkers = response.data.map((appt, index) => {
            return { location: appt.location, id: appt._id };
          });
          setMarkers(getMarkers);
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
      setIsLoading(false);
    };
    askPermission();
  }, []);

  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  ) : error ? (
    <MapView
      style={styles.container}
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.19,
        longitudeDelta: 0.19,
      }}
      showsUserLocation={true}
    >
      {markers.map((marker, index) => {
        return (
          <MapView.Marker
            key={index}
            coordinate={{
              latitude: marker.location[1],
              longitude: marker.location[0],
            }}
            onPress={() => {
              props.navigation.push("Rooms", {
                id: marker.id,
              });
            }}
          />
        );
      })}
    </MapView>
  ) : (
    <MapView
      style={styles.container}
      showsUserLocation={true}
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.19,
        longitudeDelta: 0.19,
      }}
    >
      {markers.map((marker, index) => {
        return (
          <MapView.Marker
            key={index}
            coordinate={{
              latitude: marker.location[1],
              longitude: marker.location[0],
            }}
            onPress={() => {
              props.navigation.push("Rooms", {
                id: marker.id,
              });
            }}
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
