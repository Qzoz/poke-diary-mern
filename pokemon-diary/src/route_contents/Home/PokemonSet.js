import React from "react";
import SearchSetHOC from "./SearchSetHOC";
import PokeCards from "../../poke_components/poke_cards/PokeCards";

const PokemonSet = (props) => {
  const { pokemonList } = props;
  if (!pokemonList || !pokemonList.length) return null;
  return (
    <SearchSetHOC heading={`Pokemons | ${pokemonList.length}`}>
      {pokemonList.map((pokemon) => {
        let enName = pokemon.species.enName;
        if (
          pokemon.pokeForms &&
          pokemon.pokeForms[0] &&
          pokemon.pokeForms[0].enName !== pokemon.pokeForms[0].name
        ) {
          enName = pokemon.pokeForms[0].enName;
        }
        return (
          <PokeCards
            key={`key-${pokemon.id}`}
            pokeId={pokemon.id}
            name={pokemon.name}
            enName={enName}
          />
        );
      })}
    </SearchSetHOC>
  );
};

export default PokemonSet;
