const { Schema, model } = require("mongoose");
const { cMap } = require("./CollectionNames");

const moveDamageClassSchema = new Schema({
  _id: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  enName: { type: String, required: true },
  enDescription: String,
});

const generationSchema = new Schema({
  _id: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  enName: { type: String, required: true },
});

const typeSchema = new Schema({
  _id: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  enName: { type: String, required: true },
  generation: {
    type: Number,
    ref: cMap.generation,
  },
  moveDamageClass: {
    type: Number,
    ref: cMap.moveDamageClass,
  },
  damageRelations: {},
});

const abilitySchema = new Schema({
  _id: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  enName: { type: String, required: true },
  generation: {
    type: Number,
    ref: cMap.generation,
  },
  enEffect: {},
});

const characteristicSchema = new Schema({
  _id: { type: Number, required: true },
  id: { type: Number, required: true },
  enDescription: String,
});

const statSchema = new Schema({
  _id: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  enName: { type: String, required: true },
  moveDamageClass: {
    type: Number,
    ref: cMap.moveDamageClass,
  },
  characteristics: [
    {
      type: Number,
      ref: cMap.characteristic,
    },
  ],
});

const moveCategorySchema = new Schema({
  _id: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  enDescription: String,
});

const moveSchema = new Schema({
  _id: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  enName: { type: String, required: true },
  accuracy: Number,
  effectChance: Number,
  power: Number,
  pp: Number,
  damageClass: {
    type: Number,
    ref: cMap.moveDamageClass,
  },
  generation: {
    type: Number,
    ref: cMap.generation,
  },
  type: {
    type: Number,
    ref: cMap.type,
  },
  category: {
    type: Number,
    ref: cMap.moveCategory,
  },
  enEffect: {},
  hits: {},
  statChanges: [
    {
      _id: false,
      stat: {
        type: Number,
        ref: cMap.stat,
      },
      by: Number,
    },
  ],
});

const pokemonSpeciesSchema = new Schema({
  _id: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  enName: { type: String, required: true },
  sortOrder: Number,
  genderRate: Number,
  visualGenderDiff: Boolean,
  formSwitchable: Boolean,
  evolutionChain: String,
  enFormDescription: String,
  enGenus: String,
  evolvesFrom: {
    type: Number,
    ref: cMap.pokemon,
  },
  generation: {
    type: Number,
    ref: cMap.generation,
  },
  varieties: [
    {
      _id: false,
      isDefaultVariety: Boolean,
      pokemon: {
        type: Number,
        ref: cMap.pokemon,
      },
    },
  ],
});

const pokemonFormSchema = new Schema({
  _id: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  enName: String,
  formName: String,
  enFormName: String,
  sortOrder: Number,
  sortFormOrder: Number,
  isDefaultForm: Boolean,
  isMegaForm: Boolean,
  pokemon: {
    type: Number,
    ref: cMap.pokemon,
  },
});

const pokemonSchema = new Schema({
  _id: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  height: Number,
  weight: Number,
  sortOrder: Number,
  isDefaultPokemon: Boolean,
  statList: [
    {
      _id: false,
      effortValue: Number,
      baseStat: Number,
      stat: {
        type: Number,
        ref: cMap.stat,
      },
    },
  ],
  abilities: [
    {
      _id: false,
      isHidden: Boolean,
      slot: Number,
      ability: {
        type: Number,
        ref: cMap.ability,
      },
    },
  ],
  pokeForms: [
    {
      type: Number,
      ref: cMap.pokemonForm,
    },
  ],
  moveList: [
    {
      type: Number,
      ref: cMap.move,
    },
  ],
  types: [
    {
      _id: false,
      slot: Number,
      type: {
        type: Number,
        ref: cMap.type,
      },
    },
  ],
  species: {
    type: Number,
    ref: cMap.pokemonSpecies,
  },
});

module.exports.MoveDamageClassModel = model(cMap.moveDamageClass, moveDamageClassSchema);
module.exports.GenerationModel = model(cMap.generation, generationSchema);
module.exports.TypeModel = model(cMap.type, typeSchema);
module.exports.AbilityModel = model(cMap.ability, abilitySchema);
module.exports.CharacteristicModel = model(cMap.characteristic, characteristicSchema);
module.exports.StatModel = model(cMap.stat, statSchema);
module.exports.MoveCategoryModel = model(cMap.moveCategory, moveCategorySchema);
module.exports.MoveModel = model(cMap.move, moveSchema);
module.exports.PokemonSpeciesModel = model(cMap.pokemonSpecies, pokemonSpeciesSchema);
module.exports.PokemonFormModel = model(cMap.pokemonForm, pokemonFormSchema);
module.exports.PokemonModel = model(cMap.pokemon, pokemonSchema);
