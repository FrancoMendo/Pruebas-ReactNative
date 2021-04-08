import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";

const scrollHorizontal = () => {
  const screenWidth = Dimensions.get("window").width;
  console.log("WIDTH OF WINDOWS: ", parseInt(screenWidth));
  const [pageScroll, setPageScroll] = useState(1);
  const [scroller, setScroller] = useState(1);

  useEffect(() => {
    //console.log("SCROLLER:", scroller);
  });

  function scrollToNext() {
    console.log("Scroll next");
    scroller.scrollTo({ x: 1 });
  }

  const scrollToFirst = () => {
    console.log("Scroll first");
    scroller.scrollTo({ x: 1 });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "rebeccapurple", paddingTop: 50 }}>
      <View
        style={{
          height: 50,
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          title="<<"
          style={{ width: 10 }}
          onPress={scrollToFirst}
        ></Button>
      </View>
      <ScrollView
        style={{ marginTop: 10 }}
        horizontal={true}
        pagingEnabled={true}
        ref={(scroller) => setScroller(scroller)}
      >
        <View style={styles.containerView}>
          <Text style={{ textAlign: "center" }}>Page 1</Text>
        </View>
        <View style={styles.containerView}>
          <Text style={{ textAlign: "center" }}>Page 2</Text>
          <Button title="Change page" onPress={scrollToNext}></Button>
        </View>
        <View style={styles.containerView}>
          <Text style={{ textAlign: "center" }}>Page 3</Text>
          <Button title="Change page" onPress={scrollToNext}></Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default scrollHorizontal;
