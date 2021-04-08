import React, { useState, useEffect, useRef } from "react";
import HorizontalPicker from "@vseslav/react-native-horizontal-picker";
import { View, Text, StyleSheet, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Items = Array.from(Array(365).keys());
Items.shift();

var ahora = new Date();
var comienzo = new Date(ahora.getFullYear(), 0, 0);
var dif = ahora - comienzo;
var unDia = 1000 * 60 * 60 * 24;
var dia = Math.ceil(dif / unDia);

const renderItem = (item, index) => (
  <View style={([styles.item], { width: 80 })}>
    <Text style={styles.itemText}>{item}</Text>
  </View>
);

const LN_SIDE_COLOR = "#98bf55";
const LN_CENTER_COLOR = "#fff";
export default function MyPicker() {
  const [dataArray, setDataArray] = useState([...Items, ...Items, ...Items]);

  const [limit, setLimit] = useState(2);

  const pickerHorizontal = useRef(null);

  const checkIfLimit = (index) => {
    console.log(
      "index:",
      index + 1,
      "--dataArray.length:",
      dataArray.length,
      "dataArray[index]:",
      dataArray[index],
      "--Dia:",
      dia,
      "--Zona horaria: ",
      ahora
    );
    //pickerHorizontal.current.scrollToPosition(10);

    //pickerHorizontal.current.scrollToPosition({ position: 10 });
    if (index < 63) {
      const newPosition = index + 364;
      pickerHorizontal.current.scrollToPosition(newPosition);
      //setDataArray(newArray);
      //console.log("UseRef:");
    } else if (index > 1027) {
      const newPosition = index - 364;
      pickerHorizontal.current.scrollToPosition(newPosition);
    }
  };

  // useEffect(() => {
  //   console.log("REF:", pickerHorizontal.current);
  // }, [pickerHorizontal]);
  const changeposition = () => {
    pickerHorizontal.current.scrollToPosition(10);
  };

  return (
    <View style={{ height: 145 }}>
      <Button onPress={changeposition} title={"cambiar posicion"} />
      <LinearGradient
        pointerEvents="none"
        style={styles.linearGradient}
        colors={[LN_SIDE_COLOR, LN_CENTER_COLOR, LN_SIDE_COLOR]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <HorizontalPicker
        ref={pickerHorizontal}
        defaultIndex={dia + 362}
        data={dataArray}
        renderItem={renderItem}
        itemWidth={80}
        onChange={(index) => {
          checkIfLimit(index);
        }}
        onScrollEndDrag={console.log("End drag")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B5FA5",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    width: 80,
  },
  itemText: {
    fontSize: 30,
    color: "#000",
    textAlign: "center",
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "auto",
  },
});
