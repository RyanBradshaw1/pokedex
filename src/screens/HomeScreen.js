import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SearchBar from "../components/SearchBar";
import PokemonList from "../components/PokemonList";
import axios from "axios";

const HomeScreen = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState("");

  const searchApi = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      // response.data.results === [{"name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/"}, {name: ivysaur, url: 2}])...
      getPokemonData(response.data.results);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
    } catch (err) {
      console.log("Something went wrong.");
    }
    setLoading(false);
  };

  const getPokemonData = async (result) => {
    // go thru each result, get url and from that url get pokemon details
    result.map(async (item) => {
      // item.url === 'https://pokeapi.co/api/v2/pokemon/1/', /5, /9.../20 out of order
      const response = await axios.get(item.url);
      // response.data === each pokemon's detail ie pokemon/1, pokemon/5, /9 etc
      // sort pokemon details in array based on pokemon id
      setPokemonData((state) => {
        state = [...state, response.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  const searchPokemon = async (pokemon) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );
    } catch (err) {
      console.log("Something went wrong.");
    }
  };

  useEffect(() => {
    searchApi();
  }, [url]);

  return (
    <View>
      <SearchBar onTermChange={setSearchTerm} pokemonName={searchTerm} />
      <PokemonList pokemonData={pokemonData} loading={loading} />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {!prevUrl ? null : (
          <TouchableOpacity
            onPress={() => {
              setPokemonData([]);
              setUrl(prevUrl);
            }}
          >
            <Text style={{ fontSize: 28 }}>Prev</Text>
          </TouchableOpacity>
        )}
        {!nextUrl ? null : (
          <TouchableOpacity
            onPress={() => {
              setPokemonData([]);
              setUrl(nextUrl);
            }}
          >
            <Text style={{ fontSize: 28 }}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
