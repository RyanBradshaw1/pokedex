import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import PokemonDetail from "../components/PokemonDetail";

const DetailScreen = ({ navigation }) => {
  const name = navigation.getParam("name");
  const [errorMessage, setErrorMessage] = useState("");
  const [pokeName, setPokeName] = useState("");
  const [pokeImage, setPokeImage] = useState("");
  const [pokeAbilities, setPokeAbilities] = useState([]);
  const [pokeTypes, setPokeTypes] = useState([]);
  const [pokeStats, setPokeStats] = useState([]);
  const [pokeHeight, setPokeHeight] = useState("");
  const [pokeWeight, setPokeWeight] = useState("");

  const searchApi = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokeName(response.data.name);
      setPokeImage(response.data.sprites.other.home.front_default);
      setPokeAbilities(response.data.abilities);
      setPokeTypes(response.data.types);
      setPokeStats(response.data.stats);
      setPokeHeight(response.data.height);
      setPokeWeight(response.data.weight);
    } catch (err) {
      console.log("Something went wrong.");
      setErrorMessage("Go back and try again.");
    }
  };

  useEffect(() => {
    searchApi();
  }, []);

  return (
    <View>
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <PokemonDetail
          pokeName={pokeName}
          pokeImage={pokeImage}
          pokeAbilities={pokeAbilities}
          pokeTypes={pokeTypes}
          pokeStats={pokeStats}
          pokeHeight={pokeHeight}
          pokeWeight={pokeWeight}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default DetailScreen;
