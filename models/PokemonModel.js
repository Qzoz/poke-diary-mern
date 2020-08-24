// Required Model
const { PokemonModel } = require("../misc/Schemas");

function generateIds(idReq) {
  const ids = [];
  for (let i = 1; i <= 1100; i++) {
    if (`${i}`.includes(idReq)) ids.push(i);
  }
  for (let i = 10000; i <= 10200; i++) {
    if (`${i}`.includes(idReq)) ids.push(i);
  }
  return ids;
}

function isStatQueried(statRange) {
  if (!statRange) return false;
  if (statRange[0] === 0 && statRange[1] === 255) return false;
  return true;
}

function isHWQueried(range, min, max) {
  if (!range) return false;
  if (range[0] * 10 === min && range[1] * 10 === max) return false;
  range[0] *= 10;
  range[1] *= 10;
  return true;
}

function getQuery(query) {
  const dbQuery = [];
  if (query.id) {
    dbQuery.push({ id: { $in: generateIds(query.id) } });
  }
  if (query.name) {
    dbQuery.push({ name: new RegExp(query.name, "i") });
  }
  if (query.type1 && query.type2) {
    dbQuery.push({
      $and: [{ "types.0.type": query.type1 }, { "types.1.type": query.type2 }],
    });
  } else if (query.type2) {
    dbQuery.push({ "types.1.type": query.type2 });
  } else if (query.type1) {
    dbQuery.push({ "types.0.type": query.type1 });
  }
  if (isHWQueried(query.height, 0, 200)) {
    dbQuery.push({
      $and: [
        { height: { $gte: query.height[0] } },
        { height: { $lte: query.height[1] } },
      ],
    });
  }
  if (isHWQueried(query.weight, 0, 10000)) {
    dbQuery.push({
      $and: [
        { weight: { $gte: query.weight[0] } },
        { weight: { $lte: query.weight[1] } },
      ],
    });
  }
  if (query.ability) {
    dbQuery.push({ "abilities.ability": query.ability });
  }
  if (isStatQueried(query.hp)) {
    dbQuery.push({
      $and: [
        { "statList.0.baseStat": { $gte: query.hp[0] } },
        { "statList.0.baseStat": { $lte: query.hp[1] } },
      ],
    });
  }
  if (isStatQueried(query.at)) {
    dbQuery.push({
      $and: [
        { "statList.1.baseStat": { $gte: query.at[0] } },
        { "statList.1.baseStat": { $lte: query.at[1] } },
      ],
    });
  }
  if (isStatQueried(query.df)) {
    dbQuery.push({
      $and: [
        { "statList.2.baseStat": { $gte: query.df[0] } },
        { "statList.2.baseStat": { $lte: query.df[1] } },
      ],
    });
  }
  if (isStatQueried(query.sa)) {
    dbQuery.push({
      $and: [
        { "statList.3.baseStat": { $gte: query.sa[0] } },
        { "statList.3.baseStat": { $lte: query.sa[1] } },
      ],
    });
  }
  if (isStatQueried(query.sd)) {
    dbQuery.push({
      $and: [
        { "statList.4.baseStat": { $gte: query.sd[0] } },
        { "statList.4.baseStat": { $lte: query.sd[1] } },
      ],
    });
  }
  if (isStatQueried(query.sp)) {
    dbQuery.push({
      $and: [
        { "statList.5.baseStat": { $gte: query.sp[0] } },
        { "statList.5.baseStat": { $lte: query.sp[1] } },
      ],
    });
  }
  return dbQuery;
}

module.exports = {
  getCount: async () => {
    return await PokemonModel.countDocuments().exec();
  },

  // Get Search Text Result
  searchByText: async (searchText) => {
    const query = PokemonModel.find(
      { name: searchText },
      { _id: 0, id: 1, name: 1, species: 1, pokeForms: 1 }
    )
      .populate("species", { _id: 0, id: 1, name: 1, enName: 1 })
      .populate("pokeForms", { _id: 0, id: 1, name: 1, enName: 1 })
      .sort({ id: 1 });
    return await query.exec();
  },

  // Get List By Range
  getByRange: (
    fromIndex,
    pageLimit,
    callbackFn,
    sortBy,
    sortType = 1,
    details = false
  ) => {
    let sortParam = {};
    if (sortBy && sortBy !== "id") {
      sortParam[sortBy] = sortType;
      sortParam.id = 1;
    } else {
      sortParam = { id: sortType };
    }
    const query = PokemonModel.find({}, { _id: 0, id: 1, name: 1 })
      .populate("species", {
        _id: 0,
        name: 1,
        enName: 1,
      })
      .populate("pokeForms", {
        _id: 0,
        name: 1,
        enName: 1,
      })
      .sort(sortParam)
      .skip(fromIndex)
      .limit(pageLimit);
    if (details) {
      query.select({ height: 1, weight: 1, "statList.baseStat": 1 });
    }
    query.exec(callbackFn);
  },

  // Get By Pokemon Id Or Name
  getByIdOrName: (idOrName, callback) => {
    const filterParams =
      typeof idOrName === "string" ? { name: idOrName } : { id: idOrName };
    PokemonModel.findOne(filterParams, {
      _id: 0,
      __v: 0,
      isDefaultPokemon: 0,
      sortOrder: 0,
      moveList: 0,
    })
      .populate("pokeForms", { _id: 0, __v: 0, sortOrder: 0, pokemon: 0 })
      .populate({
        path: "statList.stat",
        select: { _id: 0, characteristics: 0, __v: 0 },
        populate: {
          path: "moveDamageClass",
          select: { _id: 0, id: 0, name: 0, __v: 0 },
        },
      })
      .populate({
        path: "abilities.ability",
        select: { _id: 0, __v: 0 },
        populate: {
          path: "generation",
          select: { _id: 0, id: 0, name: 0, __v: 0 },
        },
      })
      .populate({
        path: "types.type",
        select: { _id: 0, __v: 0 },
        populate: [
          { path: "generation", select: { _id: 0, id: 0, name: 0, __v: 0 } },
          {
            path: "moveDamageClass",
            select: { _id: 0, id: 0, name: 0, __v: 0 },
          },
        ],
      })
      .populate({
        path: "species",
        select: { _id: 0, evolvesFrom: 0, sortOrder: 0, __v: 0 },
        populate: [
          { path: "generation", select: { _id: 0, id: 0, name: 0, __v: 0 } },
          {
            path: "varieties.pokemon",
            select: { _id: 0, id: 1, name: 1, species: 1, pokeForms: 1 },
            populate: [
              {
                path: "pokeForms",
                select: {
                  _id: 0,
                  id: 1,
                  name: 1,
                  enName: 1,
                  formName: 1,
                  enFormName: 1,
                },
              },
              {
                path: "species",
                select: {
                  _id: 0,
                  id: 1,
                  name: 1,
                  enName: 1,
                },
              },
            ],
          },
        ],
      })
      .exec(callback);
  },

  // Moves List By Pokemon Id or Name
  getMovesByIdOrName: (idOrName, callback) => {
    const filterParams =
      typeof idOrName === "string" ? { name: idOrName } : { id: idOrName };
    PokemonModel.findOne(filterParams, { _id: 0, movesList: 1 })
      .populate({
        path: "moveList",
        select: { _id: 0, __v: 0 },
        populate: [
          {
            path: "category",
            select: { _id: 0, __v: 0, id: 0 },
          },
          {
            path: "generation",
            select: { _id: 0, enName: 1 },
          },
          {
            path: "damageClass",
            select: { _id: 0, enName: 1 },
          },
          {
            path: "type",
            select: { _id: 0, enName: 1 },
          },
          {
            path: "statChanges.stat",
            select: { _id: 0, enName: 1 },
          },
        ],
      })
      .exec(callback);
  },

  // By Type Pokemon List
  getByTypeID: (id, callback) => {
    const query = PokemonModel.find(
      { "types.type": id },
      {
        _id: 0,
        id: 1,
        name: 1,
        height: 1,
        weight: 1,
        "statList.baseStat": 1,
      }
    )
      .populate("species", { _id: 0, name: 1, enName: 1 })
      .populate("pokeForms", { _id: 0, id: 1, name: 1, enName: 1 })
      .sort({ id: 1 });
    query.exec(callback);
  },

  // By Query Params
  getByQueryParams: (queryParams, callback) => {
    const queryList = getQuery(queryParams);
    if (!queryList.length) return callback(null, []);
    const query = PokemonModel.find(
      {},
      {
        _id: 0,
        id: 1,
        name: 1,
        height: 1,
        weight: 1,
        pokeForms: 1,
        species: 1,
      }
    );
    query
      .and(queryList)
      .populate("pokeForms", { _id: 0, name: 1, enName: 1 })
      .populate("species", { _id: 0, enName: 1 })
      .sort({ id: 1 })
      .exec(callback);
  },
};
