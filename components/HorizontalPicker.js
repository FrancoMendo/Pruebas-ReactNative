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

const LN_SIDE_COLOR = "#dedede";
const LN_CENTER_COLOR = "#fff";
export default function MyPicker() {
  const [dataArray, setDataArray] = useState([...Items, ...Items, ...Items]);

  const [currentIndex, setCurrentIndex] = useState(dia);

  const pickerHorizontal = useRef(null);

  const renderItem = (item, index) => (
    <View style={styles.item}>
      <Text
        style={[
          styles.itemText,
          {
            color: currentIndex == index ? "#000" : "#9c9c9c",
            fontWeight: currentIndex == index ? "bold" : "normal",
          },
        ]}
      >
        {item}
      </Text>
    </View>
  );

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
    } else if (index > 1027) {
      const newPosition = index - 364;
      pickerHorizontal.current.scrollToPosition(newPosition);
    }
  };

  // useEffect(() => {
  //   console.log("REF:", pickerHorizontal.current);
  // }, [pickerHorizontal]);
  const changeposition = () => {
    pickerHorizontal.current.scrollToPosition(1000);
  };

  const nextPosition = () => {
    console.log("====================================");
    console.log("Pick next");
    console.log("====================================");
    pickerHorizontal.current.scrollToPosition(currentIndex + 20);
  };

  return (
    <>
      <Button onPress={changeposition} title={"cambiar posicion"} />
      <Button onPress={nextPosition} title={">"} />
      <View style={{ height: 50 }}>
        <LinearGradient
          pointerEvents="none"
          style={styles.linearGradient}
          colors={[LN_SIDE_COLOR, LN_CENTER_COLOR, LN_SIDE_COLOR]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <View style={styles.recuadro}></View>
        <HorizontalPicker
          ref={pickerHorizontal}
          defaultIndex={dia + 362}
          data={dataArray}
          renderItem={renderItem}
          itemWidth={70}
          onChange={(index) => {
            checkIfLimit(index);
            setCurrentIndex(index);
          }}
          onScrollEndDrag={console.log("End drag")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    display: "flex",
    //backgroundColor: "#0B5FA5",
    //alignItems: "center",
    //justifyContent: "center",
    flexDirection: "column",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    width: 70,
    // alignItems: "center",
    // borderWidth: 10,
    // borderColor: "#000",
  },
  itemText: {
    fontSize: 25,
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
  recuadro: {
    position: "absolute",
    left: "41%",
    right: "41%",
    top: 0,
    bottom: 0,
    borderColor: "#98bf55",
    borderWidth: 3,
    borderRadius: 15,
    height: 50,
    // zIndex: 5,
    // marginTop: "20%",
    //marginLeft: "41%",
    //marginRight: "41%",
  },
});
