import { SearchBar } from "react-native-elements";
import React, { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");

  const updateSearch = (text) => {
    setSearch(text);
  };
  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={(text) => updateSearch(text)}
      value={search}
    />
  );
}
