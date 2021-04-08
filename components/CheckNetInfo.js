import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
// Herramientas
import NetInfo from "@react-native-community/netinfo";

const CheckNetInfo = () => {
  const [networkInfo, setNetworkInfo] = useState("");

  useEffect(() => {
    // NetInfo.fetch().then((state) => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    //   console.log("State:", state);
    //   const newInfo =
    //     " Connection type: " +
    //     state.type +
    //     "\n Is connected: " +
    //     state.isConnected +
    //     "\n intensidad: " +
    //     state.strength +
    //     "\n isWifiEnabled: " +
    //     state.isWifiEnabled +
    //     "\n isInternetReachable: " +
    //     state.isInternetReachable;
    //   setNetworkInfo(newInfo);
    // });
  }, []);

  const UpdateNetInfo = () => {
    NetInfo.fetch().then((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      console.log("State:", state);
      const newInfo =
        " Connection type: " +
        state.type +
        "\n Is connected: " +
        state.isConnected +
        "\n intensidad: " +
        state.strength +
        "\n Type:" +
        state.type;
      setNetworkInfo(newInfo);
    });
  };

  return (
    <>
      <View
        style={{
          height: 200,
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 10,
          margin: 2,
        }}
      >
        <Button onPress={UpdateNetInfo} title={"Update net info"} />
        <Text>{networkInfo}</Text>
      </View>
    </>
  );
};

export default CheckNetInfo;
