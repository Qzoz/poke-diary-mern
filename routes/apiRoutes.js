const router = require("express").Router();

///////////////////////////////////////////////////////////////////// Controllers Requiring
const typeController = require("../controllers/typeController");
const pokemonController = require("../controllers/pokemonController");
const searchController = require("../controllers/searchController");
const abilityController = require("../controllers/abilityController");
///////////////////////////////////////////////////////////////////// Controllers Acquired

// ========================================================================================

// Type Routes
///////////////////////////////////////////////////////////////////// Type Routing
router.get("/type/:idOrName", typeController.getByIdOrName);
///////////////////////////////////////////////////////////////////// Type Routed

// ========================================================================================

// Ability Routes
///////////////////////////////////////////////////////////////////// Ability Routing
router.get("/abilities/", abilityController.getAllIdName);
///////////////////////////////////////////////////////////////////// Ability Routed

// ========================================================================================

// Pokemon Routes
///////////////////////////////////////////////////////////////////// Pokemon Routing
router.get("/pokemon", pokemonController.getAll);
router.get("/pokemon/:idOrName", pokemonController.getByIdOrName);
router.get(
  "/pokemon/:idOrName/moves",
  pokemonController.getMovesByPokeIdOrName
);
router.get("/pokemon/type/:idOrName", pokemonController.getByTypeIdOrName);
//
router.post("/pokemon/query", pokemonController.getQueryResults);
///////////////////////////////////////////////////////////////////// Pokemon Routed

// ========================================================================================

// Search Routes
///////////////////////////////////////////////////////////////////// Search Routing
router.get("/search/:searchText", searchController.searchByText);
///////////////////////////////////////////////////////////////////// Search Routed

// ========================================================================================

///////////////////////////////////////////////////////////////////// Exporting
module.exports = router;
///////////////////////////////////////////////////////////////////// Exported
