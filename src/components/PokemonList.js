import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";

const PokemonList = ({ pokemonData, navigation, loading }) => {
  return (
    <View style={{ height: "85%" }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          numColumns={3}
          data={pokemonData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={{ flex: 1 / 3, alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Detail", { name: item.name })
                  }
                >
                  <Image
                    style={{ width: 96, height: 96, marginTop: 25 }}
                    source={{
                      uri: item.sprites.other["official-artwork"].front_default,
                    }}
                  />
                </TouchableOpacity>
                <Text style={{textTransform: 'capitalize'}}>
                  {item.id} - {item.name}
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default withNavigation(PokemonList);
