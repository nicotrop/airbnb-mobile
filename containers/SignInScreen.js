import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigation = useNavigation();

  const handleSignin = async () => {
    setErrorMsg("");
    setIsLoading(true);
    setIsDisabled(true);
    if (password && username) {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          { email: username, password: password }
        );
        if (response.data.token) {
          alert("Connexion reussi 🥳");
        }
        const userToken = response.data.token;
        setToken(userToken);
      } catch (error) {
        setErrorMsg(error.response.data.error);
      }
    } else {
      setErrorMsg("Please fill out required fields.");
    }
    setIsLoading(false);
    setIsDisabled(false);
  };

  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <View style={[styles.container]}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={styles.logoWrapper}>
            <Image
              source={require("../assets/airbnb_logo.png")}
              style={styles.logoImg}
            ></Image>
            <Text style={styles.pageTitle}>Sign in</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="email"
              autoCapitalize="none"
              selectTextOnFocus={true}
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.inputField}
            />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                paddingBottom: 10,
                borderBottomColor: "red",
                borderBottomWidth: 2,
                borderStyle: "solid",
              }}
            >
              <TextInput
                placeholder="password"
                autoCapitalize="none"
                secureTextEntry={showPassword}
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={{ width: "90%" }}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
                style={{
                  height: 20,
                }}
              >
                <Text style={{ textAlign: "center" }}> 👁 </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ color: "red", marginTop: 20 }}>{errorMsg}</Text>
          <TouchableOpacity
            disabled={isDisabled}
            onPress={handleSignin}
            style={{
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: "red",
              width: 200,
              height: 50,
              borderRadius: 100,
              justifyContent: "center",
              marginTop: 30,
              marginBottom: 20,
              // alignContent: "center",
            }}
          >
            <Text style={{ textAlign: "center" }}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  logoWrapper: {
    height: 250,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImg: {
    height: 108,
    width: 100,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 20,
  },
  inputWrapper: {
    width: "85%",
    paddingTop: 20,
    paddingBottom: 20,
  },
  inputField: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: "red",
    borderBottomWidth: 2,
    borderStyle: "solid",
    paddingBottom: 10,
  },
});
