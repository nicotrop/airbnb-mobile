import {
  StyleSheet,
  Text,
  Image,
  View,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

export default function Rooms() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { params } = useRoute();

  const showStars = (num) => {
    const newNum = Math.round(num);
    let arr = [];
    for (let i = 0; i < 5; i++) {
      if (i < newNum) {
        arr.push(<FontAwesome key={i} name="star" size={20} color="orange" />);
      } else {
        arr.push(<FontAwesome key={i} name="star" size={20} color="grey" />);
      }
    }
    return arr;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
        );
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
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "white",
      }}
    >
      <View style={{ position: "relative" }}>
        <FlatList
          horizontal={true}
          data={data.photos}
          keyExtractor={(item) => item.picture_id}
          renderItem={({ item }) => {
            return (
              <Image
                style={{ height: 300, width: 400 }}
                source={{ uri: item.url }}
              />
            );
          }}
        ></FlatList>
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
            {data.price} €
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
          borderWidth: 2,
        }}
      >
        <View
          style={{
            fontSize: 18,
            paddingRight: 5,
            width: "75%",
            justifyContent: "space-between",
            height: 50,
            borderWidth: 2,
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ width: "100%", fontSize: 18, paddingRight: 5 }}
          >
            {data.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            {showStars(data.ratingValue)}
            <Text style={{ marginLeft: 10 }}>{data.reviews} reviews</Text>
          </View>
        </View>
        {/* <Image
          style={{
            width: "100%",
            height: 60,
            borderRadius: 60,
            borderWidth: 2,
          }}
          source={{
            uri: data.user.account.photo.url,
          }}
        /> */}
      </View>
    </View>
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
