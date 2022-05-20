import { Button, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from "react";

export default function SettingsScreen({setToken}) {
const [test, setTest] = useState();
const [data, setData] = useState([]);

  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userToken");
      if(value){
        console.log(value);
        setTest(value);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  getData();
  console.log(test);

  // useEffect(()=>{
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("")
  //     } catch (error) {
        
  //     }
  //   }
  // },[])

  return (
    <View>
      <Text>Hello Settings</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
