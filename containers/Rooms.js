import {
  StyleSheet,
  Text,
  Image,
  View,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Rooms() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { params } = useRoute();
  //   console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <SafeAreaView style={{ height: "100%" }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <Image
          style={{ width: "100%", height: 300 }}
          source={{ uri: data.photos[0].url }}
        ></Image>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "white",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
