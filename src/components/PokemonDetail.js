import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

const PokemonDetail = ({
  pokeName,
  pokeImage,
  pokeAbilities,
  pokeTypes,
  pokeStats,
  pokeHeight,
  pokeWeight,
}) => {
  return (
    <View>
      <Text style={styles.titleStyle}>{pokeName}</Text>
      <FlatList
        contentContainerStyle={styles.flatlistPokemonTypeStyle}
        horizontal
        data={pokeTypes}
        keyExtractor={(item) => item.type.name}
        renderItem={({ item }) => {
          return (
            <Text style={styles.textPokemonTypeStyle}>{item.type.name}</Text>
          );
        }}
      />

      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: pokeImage ? pokeImage : null,
            height: 175,
            width: 175,
          }}
        />
        <View
          style={{ alignSelf: "center", flexDirection: "row", paddingLeft: 15 }}
        >
          <FlatList
            contentContainerStyle={{ marginTop: 5 }}
            data={pokeStats}
            keyExtractor={(item) => item.stat.name}
            renderItem={({ item }) => {
              return (
                <Text style={{ textTransform: "capitalize" }}>
                  {item.stat.name} - {item.base_stat}
                </Text>
              );
            }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 15,
        }}
      >
        <Text>Height: {pokeHeight * 10} cm</Text>
        <Text>Weight: {pokeWeight / 10} kg</Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 18, textDecorationLine: "underline" }}>
          Abilities
        </Text>
        <FlatList
          data={pokeAbilities}
          keyExtractor={(item) => item.ability.name}
          renderItem={({ item }) => {
            return (
              <Text style={{ textTransform: "capitalize" }}>
                {item.ability.name}
              </Text>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    textTransform: "uppercase",
    fontSize: 28,
    textAlign: "center",
    marginTop: 5,
  },
  imageStyle: {
    marginBottom: 10,
  },
  flatlistPokemonTypeStyle: {
    justifyContent: "space-evenly",
    flex: 1,
    marginTop: 10,
  },
  textPokemonTypeStyle: {
    textTransform: "uppercase",
    fontSize: 16,
  },
});

export default PokemonDetail;
