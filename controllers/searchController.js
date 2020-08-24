const { respondTo } = require("./misc/responderController");

// Models Required
const typesModel = require("../models/TypesModel");
const pokemonModel = require("../models/PokemonModel");
const moveModel = require("../models/MoveModel");
const abilityModel = require("../models/AbilityModel");

module.exports.searchByText = async (req, res, next) => {
  if (!req.params.searchText)
    return respondTo({ result: null, error: "No search text provided" });
  const searchText = RegExp(req.params.searchText, "i");
  try {
    const typesfetch = await typesModel.searchByText(searchText);
    const pokemonfetch = await pokemonModel.searchByText(searchText);
    const movefetch = await moveModel.searchByText(searchText);
    const abilityfetch = await abilityModel.searchByText(searchText);
    respondTo(
      {
        result: {
          types: typesfetch,
          pokemons: pokemonfetch,
          moves: movefetch,
          abilities: abilityfetch,
        },
        error: null,
      },
      null,
      res,
      next
    );
  } catch (err) {
    respondTo({ result: null, error: err }, null, res, next);
  }
};
