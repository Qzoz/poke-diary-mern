const { respondTo } = require("./misc/responderController");
const abilityModel = require("../models/AbilityModel");

module.exports.getAllIdName = (req, res, next) => {
  abilityModel.getAllIdName((err, abilities) => {
    if (err) return respondTo(abilities, err, res, next);
    respondTo(abilities, err, res, next);
  });
};
