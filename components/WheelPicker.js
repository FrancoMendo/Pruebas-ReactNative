import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
//Components
import Picker from "@gregfrench/react-native-wheel-picker";

//NOT SUPPORT TO EXPO

const WheelPicker = () => {
  const [selectedItem, setSelectedItem] = useState(2);
  const [itemList, setItemList] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);
  return (
    <>
      <View>
        <Text>Test wheel</Text>

        <View>
          <Text>
            <Picker
              style={{ width: 150, height: 180 }}
              lineColor="#000000" //to set top and bottom line color (Without gradients)
              lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
              lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
              selectedValue={selectedItem}
              itemStyle={{ color: "black", fontSize: 26 }}
              onValueChange={(index) => setSelectedItem(index)}
            >
              {itemList.map((value, i) => (
                <Picker.Item label={value} value={i} key={i} />
              ))}
            </Picker>
          </Text>
        </View>
      </View>
    </>
  );
};

export default WheelPicker;
