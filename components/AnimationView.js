import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  LayoutAnimation,
  StyleSheet,
  View,
  Platform,
  UIManager,
} from "react-native";

function AnimationView() {
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [boxPosition, setBoxPosition] = useState("center");

  useEffect(() => {
    // setTimeout(() => {
    //   console.log("Primer interval");
    //   toggleBox();
    // }, 3000);
  }, []);

  useEffect(() => {
    // setTimeout(() => {
    //   console.log("Segundo interval");
    //   //setBoxPosition(boxPosition === "left" ? "right" : "left");
    // }, 3000);
  }, [boxPosition]);

  const moveToLeft = () => {
    console.log("Toggle:", boxPosition);
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        500,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.scaleX
      )
    );
    setBoxPosition("left");
  };

  const moveToRight = () => {
    console.log("Toggle:", boxPosition);
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        500,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.scaleX
      )
    );
    // setBoxPosition(boxPosition === "left" ? "right" : "left");
    setBoxPosition("right");
  };

  return (
    <View>
      <Button style={{ width: "50%" }} title="Move <<" onPress={moveToLeft} />
      <Button style={{ flex: 0.2 }} title="Move >>" onPress={moveToRight} />
      <View
        style={[
          styles.box,
          boxPosition === "center"
            ? null
            : boxPosition === "right"
            ? styles.moveRight
            : styles.moveLeft,
        ]}
      >
        <Text style={{ textAlign: "center" }}>Animation</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  box: {
    height: "100%",
    width: "100%",
    borderRadius: 5,
    margin: 0,
    backgroundColor: "grey",
    alignSelf: "flex-end",
  },
  moveRight: {
    alignSelf: "flex-end",
    height: "100%",
    width: "100%",
    marginRight: 500,
    opacity: 100,
  },
  moveLeft: {
    alignSelf: "flex-end",
    height: "100%",
    width: "100%",
    marginLeft: 500,
    opacity: 100,
  },
  buttonContainer: {
    alignSelf: "center",
  },
});

export default AnimationView;
