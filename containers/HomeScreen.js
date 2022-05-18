import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        const results = JSON.stringify(response.data);
        await AsyncStorage.setItem("results", results);
        setData(response.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const showStars = (num) => {
    const newNum = Math.round(num);
    let arr = [];
    for (let i = 0; i < 5; i++) {
      if (i < newNum) {
        arr.push(<FontAwesome name="star" size={20} color="orange" />);
      } else {
        arr.push(<FontAwesome name="star" size={20} color="grey" />);
      }
    }
    return arr;
  };

  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View
      style={{ backgroundColor: "white", paddingTop: 10, paddingBottom: 20 }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Rooms", { id: item._id });
              }}
              activeOpacity={0.9}
            >
              <View
                style={{
                  flex: 1,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    position: "relative",
                    borderStyle: "solid",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: 200,
                    }}
                    source={{
                      uri: item.photos[0].url,
                    }}
                  ></Image>
                  <View
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 10,
                      backgroundColor: "black",
                      width: 60,
                      height: 30,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      {item.price} €
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      fontSize: 18,
                      paddingRight: 5,
                      width: "75%",
                      justifyContent: "space-between",
                      height: 50,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ width: "100%", fontSize: 18, paddingRight: 5 }}
                    >
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      {showStars(item.ratingValue)}
                      <Text style={{ marginLeft: 10 }}>
                        {item.reviews} reviews
                      </Text>
                    </View>
                  </View>
                  <Image
                    style={{
                      width: "15%",
                      height: 60,
                      borderRadius: 60,
                      // position: "relative",
                    }}
                    source={{
                      uri: item.user.account.photo.url,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
