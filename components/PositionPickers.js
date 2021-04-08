import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

// or any pure javascript modules available in npm
import SmoothPicker from "react-native-smooth-picker";

const rangePlot = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1000];
const rowPlot = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const opacities = {
  0: 1,
  1: 0.6,
  2: 0.3,
  3: 0.2,
  4: 0.1,
};
const sizeText = {
  0: 15,
  1: 10,
  2: 5,
};

const Item = React.memo(({ opacity, selected, vertical, fontSize, name }) => {
  return (
    <View
      style={[
        styles.OptionWrapper,
        {
          opacity,
          backgroundColor: selected ? "#D8D8D8" : "#e9e9e9",
          borderColor: selected ? "#939393" : "transparent",
          width: vertical ? 90 : "auto",
        },
      ]}
    >
      <Text style={{ fontSize }}>{name}</Text>
    </View>
  );
});

const ItemToRender = ({ item, index }, indexSelected, vertical) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);

  let opacity = opacities[gap];
  if (gap > 3) {
    opacity = opacities[4];
  }
  let fontSize = sizeText[gap];
  if (gap > 1) {
    fontSize = sizeText[2];
  }

  return (
    <Item
      opacity={opacity}
      selected={selected}
      vertical={vertical}
      fontSize={fontSize}
      name={item}
    />
  );
};

export default function PickerPosition() {
  function handleChangeRange(index) {
    setRangeSelected(index);
  }
  function handleChangeRow(index) {
    setRowSelected(index);
  }

  const [rangeSelected, setRangeSelected] = React.useState(4);
  const [rowSelected, setRowSelected] = React.useState(3);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.textCategory}>Range</Text>
        </View>
        <View style={styles.pickerContainer}>
          <SmoothPicker
            initialScrollToIndex={rangeSelected}
            onScrollToIndexFailed={() => {}}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            data={rangePlot}
            scrollAnimation
            onSelected={({ item, index }) => handleChangeRange(index)}
            renderItem={(option) => ItemToRender(option, rangeSelected, true)}
            magnet
            selectOnPress
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textCategory}>Row</Text>
        </View>
        <View style={styles.pickerContainer}>
          <SmoothPicker
            initialScrollToIndex={rowSelected}
            onScrollToIndexFailed={() => {}}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            data={rowPlot}
            scrollAnimation
            onSelected={({ item, index }) => handleChangeRow(index)}
            renderItem={(option) => ItemToRender(option, rowSelected, true)}
            magnet
            selectOnPress
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
  rowContainer: {
    height: 200,
    width: 100,
    paddingBottom: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  pickerContainer: {
    height: 200,
    width: 100,
    paddingBottom: 0,
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  textCategory: {
    fontSize: 20,
    paddingBottom: 20,
  },
  OptionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "#e9e9e9",
  },
});
