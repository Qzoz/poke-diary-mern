const { respondTo } = require("./misc/responderController");
const pokemonModel = require("../models/PokemonModel");
const typeModel = require("../models/TypesModel");

module.exports.getAll = (req, res, next) => {
  function getNumVal(val, defaultValue = 0) {
    if (isNaN(val)) return defaultValue;
    return Number(val);
  }
  const details = req.query.details ? true : false;
  const sortBy = req.query.sortBy;
  const sortType = getNumVal(req.query.sortType, 1);
  const pageOffset = getNumVal(req.query.pageOffset);
  const pageLimit = getNumVal(req.query.pageLimit, 20);
  pokemonModel.getByRange(
    pageOffset,
    pageLimit,
    async (err, pokemons) => {
      if (err) return respondTo(pokemons, err, res, next);
      const pokemonCount = await pokemonModel.getCount();
      let prevPageOffset =
        pageOffset - pageLimit < 0 ? 0 : pageOffset - pageLimit;
      let nextPageOffset =
        pageOffset + pageLimit > pokemonCount ? 0 : pageOffset + pageLimit;
      respondTo(
        {
          pokemonCount: pokemonCount,
          prevPageUrl: pageOffset
            ? `/api/pokemon?pageOffset=${prevPageOffset}&pageLimit=${pageLimit}`
            : null,
          nextPageUrl: nextPageOffset
            ? `/api/pokemon?pageOffset=${nextPageOffset}&pageLimit=${pageLimit}`
            : null,
          pokemons: pokemons,
        },
        err,
        res,
        next
      );
    },
    sortBy,
    sortType,
    details
  );
};

module.exports.getByIdOrName = (req, res, next) => {
  let pokeIdOrName = req.params.idOrName;
  if (!isNaN(pokeIdOrName)) pokeIdOrName = Number(pokeIdOrName);
  pokemonModel.getByIdOrName(pokeIdOrName, (err, pokemon) => {
    respondTo(pokemon, err, res, next);
  });
};

module.exports.getByTypeIdOrName = (req, res, next) => {
  let typeIdOrName = req.params.idOrName;
  if (isNaN(typeIdOrName)) {
    typeModel.getIdByName(typeIdOrName, (err, type) => {
      if (err) return respondTo(null, err, res, next);
      pokemonModel.getByTypeID(type.id, (err, pokemons) => {
        respondTo(pokemons, err, res, next);
      });
    });
  } else {
    typeIdOrName = parseInt(typeIdOrName);
    pokemonModel.getByTypeID(typeIdOrName, (err, pokemons) => {
      respondTo(pokemons, err, res, next);
    });
  }
};

module.exports.getMovesByPokeIdOrName = (req, res, next) => {
  let idOrName = req.params.idOrName;
  if (!isNaN(idOrName)) idOrName = parseInt(idOrName);
  pokemonModel.getMovesByIdOrName(idOrName, (err, pokemon) => {
    if (!err && pokemon && pokemon.moveList)
      return respondTo(pokemon.moveList, err, res, next);
    respondTo(pokemon, err, res, next);
  });
};

module.exports.getQueryResults = (req, res, next) => {
  pokemonModel.getByQueryParams(req.body.data, (err, pokemons) => {
    respondTo(pokemons, err, res, next);
  })
}
