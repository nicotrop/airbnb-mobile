import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ForArrow(props) {
  const navigation = useNavigation();
  console.log(navigation);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Ionicons name="ios-arrow-forward-circle" size={28} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    justifyContent: "center",
  },
});
