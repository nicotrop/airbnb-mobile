import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function LogoTitle() {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 25, height: 28 }}
        source={require("../assets/airbnb_logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },
});
