import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
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
    <KeyboardAwareScrollView>
      <View>
        <View>
          <Text>email: {email} </Text>
          <TextInput
            placeholder="email"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text>username: {username} </Text>
          <TextInput
            placeholder="username"
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <Text>description: {description} </Text>
          <TextInput
            placeholder="description"
            autoCapitalize="none"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <Text>Password: {password} </Text>
          <TextInput
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={showPassword1}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => {
              setShowPassword1(!showPassword1);
            }}
            style={{ height: 20, width: 60, borderWidth: 2 }}
          >
            <Text>👁{showPassword1 ? "true" : "false"}</Text>
          </TouchableOpacity>
          <Text>Confirm password: {confirmPassword} </Text>
          <TextInput
            placeholder="confirm password"
            secureTextEntry={showPassword2}
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            onPress={() => {
              setShowPassword2(!showPassword2);
            }}
            style={{ height: 20, width: 60, borderWidth: 2 }}
          >
            <Text>👁{showPassword2 ? "true" : "false"}</Text>
          </TouchableOpacity>
          <Button title="Sign up" onPress={handleSignup} />
          <Text>{errorMsg}</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
