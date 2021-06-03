import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Button,
  LayoutAnimation,
  UIManager,
  Platform,
  TouchableOpacity,
} from "react-native";
//Components
import Search from "./components/Search";
import AnimationView from "./components/AnimationView";
import MyPicker from "./components/HorizontalPicker";
import LoopPicker from "./components/LoopPicker";
import HorizontalPicker from "@vseslav/react-native-horizontal-picker";
import CheckNetInfo from "./components/CheckNetInfo";
import CalendarReminder from "./components/CalendarReminder";
//import CircularPickerLib from "./components/CircularPickerLib";
//import NumberPicker from "./components/NumberPicker";

export default function App() {
  const screenWidth = Dimensions.get("window").width;
  console.log("WIDTH OF WINDOWS: ", parseInt(screenWidth));
  const [pageScroll, setPageScroll] = useState(1);
  const [scroller, setScroller] = useState(1);

  const [exampleState, setExampleState] = useState({
    NotesXRangeRatings: [
      {
        RangeXRatingId: 0,
        Value: "string",
      },
    ],
  });
  // Effects
  useEffect(() => {
    // console.log("DATA:", exampleState);
  }, []);
  // Functions
  const checkNetInfo = () => {
    NetInfo.fetch().then((state) => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      // console.log("State:", state);
    });
  };

  const setExample = () => {
    setExampleState({
      ...exampleState,
      NotesXRangeRatings: [
        ...exampleState.NotesXRangeRatings,
        {
          RangeXRatingId: 1,
          Value: "prueba",
        },
      ],
    });
  };
  const log = () => {
    //  console.log("DATAa:", exampleState);
  };

  function scrollToNext() {
    //console.log("Scroll next");
    scroller.scrollTo({ x: 1 });
  }

  const scrollToFirst = () => {
    // console.log("Scroll first");
    scroller.scrollTo({ x: 1 });
  };

  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  return (
    <>
      <View
        style={{ flex: 0.2, backgroundColor: "rebeccapurple", paddingTop: 50 }}
      >
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
            <AnimationView />
            {/* <PositionPickers /> */}
          </View>
          <View style={styles.containerView}>
            <Text style={{ textAlign: "center" }}>Page 2</Text>
            <Button title="Change page" onPress={scrollToNext}></Button>
            <Button title="LOG" onPress={log}></Button>
            <Button title="setState" onPress={setExample}></Button>
            <Search />
          </View>
          <View style={styles.containerView}>
            <Text style={{ textAlign: "center" }}>Page 3</Text>
            <Button title="Change page" onPress={scrollToNext}></Button>
            <CheckNetInfo />
            {/* <PositionPickers /> */}
          </View>
        </ScrollView>
      </View>
      <View>
        <CalendarReminder />
      </View>
      {/* <MyPicker /> */}
      {/* <MyPicker /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerView: {
    flex: 1,
    width: parseInt(Dimensions.get("window").width),
    alignContent: "center",
  },
});
