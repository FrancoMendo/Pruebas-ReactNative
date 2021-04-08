import React, { useState, useRef } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";
import InfiniteScroll from "react-native-infinite-looping-scroll";

const LoopPicker = () => {
  const Items = Array.from(Array(365).keys());
  const [activeIndex, setActiveIndex] = useState(5);

  const flatList = useRef < FlatList > null;
  return (
    <View style={styles.container}>
      <InfiniteScroll
        data={Items}
        renderItem={({ item }) => (
          <View key={item} style={styles.listItem}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        horizontal={true}
        initialScrollIndex={activeIndex}
        onScrollToIndexFailed={(info) => {
          console.log("Fail in scroll to index:", info);
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatList.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        onScroll={(item) => setActiveIndex(item)}
      />
    </View>
  );
};

export default LoopPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 50,
    margin: 2,
    borderColor: "#0099A8",
    borderWidth: 10,
    backgroundColor: "#FEFEFE",
  },
  text: {
    color: "#0099A8",
    fontSize: 20,
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
