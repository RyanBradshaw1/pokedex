import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

const SearchBar = ({ onTermChange, pokemonName, navigation }) => {
  return (
    <View style={styles.backgroundStyle}>
      <EvilIcons style={styles.iconStyle} name="search" />
      <TextInput
        style={styles.inputStyle}
        placeholder="Search"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onTermChange}
        onEndEditing={() =>
          navigation.navigate("Detail", { name: pokemonName })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "rgb(200,200,200)",
    height: 50,
    marginHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: "row",
  },
  iconStyle: {
    fontSize: 42,
    alignSelf: "center",
    marginHorizontal: 5,
  },
  inputStyle: {
    fontSize: 20,
    flex: 1,
  },
});

export default withNavigation(SearchBar);
