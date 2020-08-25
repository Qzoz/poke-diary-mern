export default {
  imgPokemon: (id, spec = "", ext = ".png") => {
    return `/poke/diary/img/${id}${spec}${ext}`;
  },
  imgPokemonSmall: (id, spec = "", ext = ".png") => {
    return `/poke/diary/img/sm/${id}${spec}${ext}`;
  },
  imgTypePlain: (name, ext = ".png") => {
    return `/poke/diary/type/img/plain/${name}${ext}`;
  },
  imgTypeGo: (name, ext = ".png") => {
    return `/poke/diary/type/img/go/${name}${ext}`;
  },
  imgTypeMaster: (name, ext = ".png") => {
    return `/poke/diary/type/img/master/${name}${ext}`;
  },
  search: (text) => {
    return `/api/search/${text}`;
  },
  pokemon: {
    getAll: () => {
      return `/api/pokemon`;
    },
    getById: (id) => {
      return `/api/pokemon/${id}`;
    },
    getByType: (idOrName) => {
      return `/api/pokemon/type/${idOrName}`;
    },
    getMovesById: (id) => {
      return `/api/pokemon/${id}/moves`;
    },
    query: () => {
      return `/api/pokemon/query`
    }
  },
  types: {
    getByIdOrName: (idOrName) => {
      return `/api/type/${idOrName}`;
    },
  },
  ability: {
    getAll: () => {
      return `/api/abilities/`;
    }
  }
};
