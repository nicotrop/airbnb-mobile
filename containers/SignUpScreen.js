import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);

  const handleSignup = async () => {
    setErrorMsg("");
    setIsLoading(true);
    if (password && username && email && description && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          if (response.data.token) {
            alert(`Welcome ${username} 🥳`);
          }
          const userToken = response.data.token;
          setToken(userToken);
        } catch (error) {
          setErrorMsg(error.response.data.error);
        }
      } else {
        setErrorMsg("Passwords do not match!");
      }
    } else {
      setErrorMsg("Please fill out all the fields!");
    }
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
            <Text style={styles.pageTitle}>Sign up</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="email"
              placeholderTextColor="black"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.inputField}
            />
            <TextInput
              placeholder="username"
              autoCapitalize="none"
              placeholderTextColor="black"
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.inputField}
            />
            <View
              style={{
                height: 100,
                borderColor: "red",
                borderWidth: 2,
                borderStyle: "solid",
                paddingLeft: 5,
                marginTop: 20,
                marginBottom: 40,
              }}
            >
              <TextInput
                placeholder="Describe yourself in a few words..."
                autoCapitalize="none"
                multiline={true}
                numberOfLines={4}
                placeholderTextColor="black"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
            </View>
            <View style={styles.passwordWrapper}>
              <TextInput
                placeholder="password"
                autoCapitalize="none"
                placeholderTextColor="black"
                secureTextEntry={showPassword1}
                value={password}
                style={{ width: "90%" }}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowPassword1(!showPassword1);
                }}
                style={{
                  height: 20,
                }}
              >
                <Text style={{ textAlign: "center" }}>👁</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.passwordWrapper}>
              <TextInput
                placeholder="confirm password"
                secureTextEntry={showPassword2}
                placeholderTextColor="black"
                autoCapitalize="none"
                value={confirmPassword}
                style={{ width: "90%" }}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowPassword2(!showPassword2);
                }}
                style={{
                  height: 20,
                }}
              >
                <Text>👁</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.errorStyling}>{errorMsg}</Text>
          <TouchableOpacity onPress={handleSignup} style={styles.mainBtn}>
            <Text style={{ textAlign: "center" }}>Sign up</Text>
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
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: "white",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  logoWrapper: {
    height: 200,
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
    marginTop: 10,
  },
  inputWrapper: {
    width: "85%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputField: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: "red",
    borderBottomWidth: 2,
    borderStyle: "solid",
    paddingBottom: 10,
  },
  passwordWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomColor: "red",
    borderBottomWidth: 2,
    borderStyle: "solid",
    // marginTop: 20,
    marginBottom: 20,
  },
  errorStyling: {
    color: "red",
    marginTop: 20,
  },
  mainBtn: {
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
  },
});
